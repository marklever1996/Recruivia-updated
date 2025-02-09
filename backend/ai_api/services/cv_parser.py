from openai import OpenAI
from PyPDF2 import PdfReader
import os
from dotenv import load_dotenv
import json
import tempfile
import traceback

load_dotenv()
client = OpenAI()

def extract_cv_data(pdf_file):
    """Extract en analyseer CV data met AI"""
    try:
        print("Start CV parsing...")
        
        # Log bestandsinfo
        print(f"Ontvangen bestand: {pdf_file.filename}")
        
        # Sla het bestand tijdelijk op
        temp_dir = tempfile.gettempdir()
        temp_path = os.path.join(temp_dir, 'temp_cv.pdf')
        pdf_file.save(temp_path)
        print(f"Bestand tijdelijk opgeslagen in: {temp_path}")

        # Extract text from PDF
        reader = PdfReader(temp_path)
        cv_text = ""
        for page in reader.pages:
            cv_text += page.extract_text()
        
        print(f"Geëxtraheerde tekst lengte: {len(cv_text)} karakters")

        # Vraag GPT-4 om de CV data te structureren
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "Je bent een CV parser. Geef alleen de JSON data terug, geen extra tekst."
                },
                {
                    "role": "user",
                    "content": f"""
                    Analyseer deze CV tekst en geef de informatie terug in dit exacte JSON formaat:
                    {{
                        "personal_info": {{
                            "name": "Naam",
                            "email": "email@example.com",
                            "phone": "telefoonnummer",
                            "location": "locatie"
                        }},
                        "skills": ["skill1", "skill2"],
                        "experience": [
                            {{
                                "company": "Bedrijfsnaam",
                                "position": "Functie",
                                "period": "Periode"
                            }}
                        ],
                        "education": [
                            {{
                                "institution": "School",
                                "degree": "Opleiding",
                                "period": "Periode"
                            }}
                        ],
                        "languages": ["taal1", "taal2"],
                        "certifications": ["certificaat1", "certificaat2"]
                    }}

                    CV Tekst:
                    {cv_text}
                    """
                }
            ],
            temperature=0.3
        )

        # Haal alleen de JSON data uit de response
        response_text = response.choices[0].message.content
        # Zoek naar het eerste { en laatste }
        json_start = response_text.find('{')
        json_end = response_text.rfind('}') + 1
        
        if json_start == -1 or json_end == 0:
            raise ValueError("Geen JSON gevonden in GPT response")
            
        json_str = response_text[json_start:json_end]
        
        try:
            result = json.loads(json_str)
            print("GPT-4 response succesvol geparsed naar JSON")
            return result
        except json.JSONDecodeError as e:
            print(f"ERROR: Kon GPT response niet parsen naar JSON: {str(e)}")
            print("Ruwe GPT response:", response_text)
            raise ValueError("GPT-4 gaf geen geldig JSON formaat terug")

    except Exception as e:
        print(f"ERROR in CV parsing: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        print(f"Error traceback: {traceback.format_exc()}")
        return {
            "error": f"Er ging iets mis bij het verwerken van het CV: {str(e)}"
        } 