from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
# Hier zijn de functies die we gebruiken
from services.vacature_generator import generate_vacature_text_as_html
from services.cv_analyzer import extract_text_from_pdf, analyze_cv_match
# Tijdelijk uitgeschakeld totdat whisper is geïnstalleerd
# from services.transcription_service import transcription_bp
import requests
from services.cv_parser import extract_cv_data
from services.candidate_matcher import find_matching_candidates
from services.chat_service import get_ai_response
from flask_cors import cross_origin


load_dotenv()  # Laad environment variables

# Configureer OpenAI
import openai
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)  # Dit staat cross-origin requests toe

# Tijdelijk uitgeschakeld
# app.register_blueprint(transcription_bp)

# Voeg een basis route toe
@app.route('/')
def home():
    return jsonify({
        'status': 'online',
        'message': 'Recruivia API is running',
        'endpoints': [
            '/api/generate-vacancy',
            '/api/analyze-match',
            '/api/parse-cv',
            '/api/match-candidates',
            '/api/chat'
        ]
    })

@app.route('/api/generate-vacancy', methods=['POST'])
def generate_vacancy():
    try:
        # Ontvang de JSON-data
        data = request.get_json()

        # Debug: Print de ontvangen data
        print("Received data:", json.dumps(data, indent=4))

        # Standaardwaarden voor ontbrekende velden
        input_data = {
            "functie": data.get("functie", "Onbekende functie"), 
            "locatie": data.get("locatie", "Onbekende locatie"), 
            "organisatie": data.get("organisatie", "Onbekend bedrijf"), 
            "salaris": data.get("salaris", "Nader te bepalen"), 
            "uren": data.get("uren", "Niet gespecificeerd"), 
            "secundaire_arbeidsvoorwaarden": data.get("secundaire_arbeidsvoorwaarden", "Niet vermeld"),
            "specifieke_taken": data.get("specifieke_taken", []),
            "soft_skills": data.get("soft_skills", "Niet gespecificeerd"), 
            "hard_skills": data.get("hard_skills", []),  
            "organisatie_cultuur": data.get("organisatie_cultuur", "Niet vermeld"), 
            "team_samenstelling": data.get("team_samenstelling", "Niet vermeld"), 
            "geschiedenis": data.get("geschiedenis", "Niet vermeld"), 
            "sector": data.get("sector", "Algemeen"), 
            "kernactiviteit": data.get("kernactiviteit", "Niet gespecificeerd"), 
            "missie_visie_kernwaarden": data.get("missie_visie_kernwaarden", "Niet vermeld"), 
            "maatschappelijke_bijdrage": data.get("maatschappelijke_bijdrage", "Niet gespecificeerd") 
        } 

        # Genereer de vacaturetekst
        generated_html = generate_vacature_text_as_html(input_data)

        # Debug: Print het gegenereerde HTML-resultaat
        print("Generated HTML:", generated_html[:500])  # Print alleen de eerste 500 tekens

        return jsonify({
            'success': True,
            'html': generated_html
        })

    except Exception as e:
        print("Error:", str(e))  # Debug logging
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    
@app.route('/api/analyze-match', methods=['POST'])
def analyze_match():
    try:
        if 'cv' not in request.files:
            return jsonify({'error': 'Geen CV bestand geüpload'}), 400
        
        cv_file = request.files['cv']
        vacancy_id = request.form.get('vacancy_id')
        
        if not vacancy_id:
            return jsonify({'error': 'Geen vacature ID opgegeven'}), 400

        # Haal vacature details op van de Symfony backend
        vacancy_response = requests.get(f'http://localhost:8000/api/vacancies/{vacancy_id}')
        if not vacancy_response.ok:
            return jsonify({'error': 'Kon vacature niet ophalen'}), 400
        
        vacancy_details = vacancy_response.json()

        # Extraheer tekst uit PDF
        cv_text = extract_text_from_pdf(cv_file)
        
        # Analyseer de match
        analysis_result = analyze_cv_match(cv_text, vacancy_details['description'])
        
        return jsonify(analysis_result)

    except Exception as e:
        print(f"Error in analyze_match: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/parse-cv', methods=['POST'])
def parse_cv():
    if 'cv' not in request.files:
        return jsonify({'error': 'Geen CV bestand ontvangen'}), 400
    
    cv_file = request.files['cv']
    result = extract_cv_data(cv_file)
    return jsonify(result)

@app.route('/api/match-candidates', methods=['POST'])
def match_candidates():
    try:
        data = request.json
        vacancy = data.get('vacancy')
        candidates = data.get('candidates')
        
        if not vacancy or not candidates:
            return jsonify({'error': 'Vacancy en candidates zijn verplicht'}), 400
            
        matches = find_matching_candidates(vacancy, candidates)
        return jsonify(matches)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
@cross_origin()
def chat():
    try:
        data = request.json
        message = data.get('message', '')

        # Probeer kandidaat data op te halen, maar ga door als het niet lukt
        try:
            response = requests.get('http://localhost:8000/api/candidates')
            candidate_data = response.json() if response.ok else None
        except:
            candidate_data = None
            print("Kon geen verbinding maken met kandidaten API")

        # Haal conversation history op als die bestaat
        conversation_history = data.get('conversation_history', [])

        # Krijg antwoord van de AI
        response = get_ai_response(
            message=message,
            candidate_data=candidate_data,
            conversation_history=conversation_history
        )

        return jsonify({
            'response': response
        })

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        # Stuur 200 OK met foutbericht in plaats van 500
        return jsonify({
            'response': "Er lijkt iets mis te gaan met de verbinding. Probeer het over een paar minuten opnieuw of neem contact op met de support als het probleem aanhoudt."
        }), 200

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5000) 