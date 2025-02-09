from openai import OpenAI
from PyPDF2 import PdfReader
import os
from dotenv import load_dotenv
import json

load_dotenv()
client = OpenAI()

def extract_text_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def analyze_cv_match(cv_text, vacancy_details):
    try:
        # Extraheer eerst de requirements en kandidaat data met GPT-4
        extracted_data = extract_requirements_and_candidate_data(cv_text, vacancy_details)
        
        # Bereken de match score met de wetenschappelijke formule
        match_percentage = calculate_match_percentage(
            extracted_data['candidate_data'],
            extracted_data['vacancy_requirements']
        )

        # Gebruik het percentage in de verdere analyse
        prompt = f"""
        Als ervaren recruitment expert, analyseer de match tussen dit CV en de vacature.
        Focus op:
        1. Harde criteria (vereiste vaardigheden, ervaring, opleiding)
        2. Zachte criteria (cultuurfit, communicatiestijl, werkhouding)
        3. Potentieel voor groei en ontwikkeling
        4. Mogelijke red flags of aandachtspunten
        
        Vacature details:
        {vacancy_details}
        
        CV tekst:
        {cv_text}
        
        Geef een gestructureerde analyse in het volgende JSON format, met alle tekst in het Nederlands:
        {{
            "match_percentage": <objectief percentage gebaseerd op harde en zachte criteria>,
            "matching_skills": ["specifieke sterke matches in het Nederlands"],
            "missing_skills": ["cruciale ontbrekende vaardigheden in het Nederlands"],
            "recommendations": {{
                "algemene_analyse": "Korte algemene analyse van de kandidaat (max 3 zinnen)",
                "vervolgstappen": [
                    "Stap 1: [concrete actie]",
                    "Stap 2: [concrete actie]",
                    "..."
                ],
                "interview_vragen": [
                    "Vraag 1: [specifieke vraag]",
                    "Vraag 2: [specifieke vraag]",
                    "..."
                ],
                "ontwikkelpunten": [
                    "Punt 1: [ontwikkelpunt met toelichting]",
                    "Punt 2: [ontwikkelpunt met toelichting]",
                    "..."
                ],
                "aandachtspunten": [
                    "Punt 1: [specifiek aandachtspunt]",
                    "Punt 2: [specifiek aandachtspunt]",
                    "..."
                ]
            }}
        }}
        
        Zorg dat alle punten concreet en direct toepasbaar zijn voor de recruiter.
        Gebruik alleen Nederlands in je antwoord.
        Wees kritisch maar constructief.
        """

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system", 
                    "content": "Je bent een Nederlandse recruitment expert die CV's analyseert. Geef alleen een geldig JSON object terug in het Nederlands."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )

        # Parse het JSON antwoord
        try:
            result = json.loads(response.choices[0].message.content)
        except json.JSONDecodeError:
            # Als JSON parsing mislukt, stuur een geformatteerd fallback antwoord
            return {
                "match_percentage": 0,
                "matching_skills": [],
                "missing_skills": [],
                "recommendations": "Er ging iets mis bij het analyseren van de match. Probeer het opnieuw."
            }

        return result

    except Exception as e:
        print(f"Error in analyze_cv_match: {e}")
        raise e 

def calculate_match_percentage(candidate_data, vacancy_requirements):
    """
    Berekent match percentage op basis van gewogen criteria:
    
    Score = (0.4 * HS + 0.3 * EX + 0.2 * ED + 0.1 * SS) * 100
    
    waar:
    HS (Hard Skills) = aantal matching skills / totaal vereiste skills
    EX (Experience) = min(kandidaat_jaren / vereiste_jaren, 1.2)
    ED (Education) = opleidingsniveau_match (0-1)
    SS (Soft Skills) = aantal matching soft skills / totaal gewenste soft skills
    
    Maximale score per component:
    - Hard Skills (40%): Technische vaardigheden, tools, certificeringen
    - Experience (30%): Werkervaring in jaren en relevantie
    - Education (20%): Opleidingsniveau en richting
    - Soft Skills (10%): Communicatie, teamwork, leiderschap etc.
    
    Bonus/Malus:
    - +5% voor exact matching skills
    - +3% voor relevante certificeringen
    - -5% voor gaps in employment
    - -3% voor missende cruciale vaardigheden
    """
    try:
        # Hard Skills Score (40%)
        required_skills = set(vacancy_requirements.get('required_skills', []))
        candidate_skills = set(candidate_data.get('skills', []))
        hard_skills_score = len(required_skills.intersection(candidate_skills)) / len(required_skills) if required_skills else 0

        # Experience Score (30%)
        required_years = vacancy_requirements.get('required_experience', 0)
        candidate_years = candidate_data.get('years_experience', 0)
        experience_score = min(candidate_years / required_years, 1.2) if required_years > 0 else 0

        # Education Score (20%)
        education_levels = {
            'mbo': 0.6,
            'hbo': 0.8,
            'wo': 1.0,
            'phd': 1.2
        }
        required_education = vacancy_requirements.get('education_level', 'hbo')
        candidate_education = candidate_data.get('education_level', 'mbo')
        education_score = education_levels.get(candidate_education, 0) / education_levels.get(required_education, 1)

        # Soft Skills Score (10%)
        required_soft_skills = set(vacancy_requirements.get('soft_skills', []))
        candidate_soft_skills = set(candidate_data.get('soft_skills', []))
        soft_skills_score = len(required_soft_skills.intersection(candidate_soft_skills)) / len(required_soft_skills) if required_soft_skills else 0

        # Basis score berekening
        base_score = (
            0.4 * hard_skills_score +
            0.3 * experience_score +
            0.2 * education_score +
            0.1 * soft_skills_score
        ) * 100

        # Bonus/Malus aanpassingen
        adjustments = 0
        
        # Bonus voor exact matching skills
        exact_matches = len(required_skills.intersection(candidate_skills))
        if exact_matches >= len(required_skills):
            adjustments += 5

        # Bonus voor relevante certificeringen
        if candidate_data.get('certifications'):
            adjustments += 3

        # Malus voor employment gaps
        if candidate_data.get('has_employment_gaps'):
            adjustments -= 5

        # Malus voor missende cruciale vaardigheden
        crucial_skills = set(vacancy_requirements.get('crucial_skills', []))
        missing_crucial = crucial_skills - candidate_skills
        if missing_crucial:
            adjustments -= 3

        # Finale score berekening
        final_score = max(min(base_score + adjustments, 100), 0)
        
        return round(final_score, 1)

    except Exception as e:
        print(f"Error in calculate_match_percentage: {e}")
        return 0 

def extract_requirements_and_candidate_data(cv_text, vacancy_details):
    """Extraheert gestructureerde data uit CV en vacature tekst met GPT-4"""
    try:
        prompt = f"""
        Extraheer de volgende informatie uit het CV en de vacature in JSON format:
        {{
            "candidate_data": {{
                "skills": [],
                "years_experience": 0,
                "education_level": "mbo/hbo/wo/phd",
                "soft_skills": [],
                "certifications": [],
                "has_employment_gaps": false
            }},
            "vacancy_requirements": {{
                "required_skills": [],
                "required_experience": 0,
                "education_level": "mbo/hbo/wo/phd",
                "soft_skills": [],
                "crucial_skills": []
            }}
        }}

        CV: {cv_text}
        Vacature: {vacancy_details}
        """

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1
        )

        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Error extracting data: {e}")
        return {
            "candidate_data": {},
            "vacancy_requirements": {}
        } 