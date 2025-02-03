import openai
from PyPDF2 import PdfReader
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

def extract_text_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def analyze_cv_match(cv_text, vacancy_details):
    try:
        # Creëer een prompt voor de analyse
        prompt = f"""
        Analyseer de match tussen dit CV en de vacature.
        
        Vacature details:
        {vacancy_details}
        
        CV tekst:
        {cv_text}
        
        Geef een gestructureerde analyse met:
        1. Een match percentage (0-100)
        2. Lijst van matchende vaardigheden
        3. Lijst van missende vaardigheden
        4. Aanbevelingen voor de recruiter
        
        Geef het antwoord in JSON format.
        """

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Je bent een expert CV analyzer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )

        return response['choices'][0]['message']['content']
    except Exception as e:
        print(f"Error in analyze_cv_match: {e}")
        raise e 