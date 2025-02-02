from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
# Hier zijn de functies die we gebruiken
from Projecten.Recruivia.recruivia.backend.ai_api.vacature_generator import generate_vacature_text_as_html
from Projecten.Recruivia.recruivia.backend.ai_api.cv_analyzer import extract_text_from_pdf, analyze_cv_match
from Projecten.Recruivia.recruivia.backend.ai_api.transcription_service import transcription_bp

load_dotenv()  # Laad environment variables

# Configureer OpenAI
import openai
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)  # Dit staat cross-origin requests toe

# Register blueprints
app.register_blueprint(transcription_bp)

# Voeg een basis route toe
@app.route('/')
def home():
    return jsonify({
        'status': 'online',
        'message': 'Recruivia API is running',
        'endpoints': [
            '/api/generate-vacancy',
            '/api/analyze-match'
        ]
    })

@app.route('/api/generate-vacancy', methods=['POST'])
def generate_vacancy():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debug logging
        
        # Genereer de vacaturetekst met de ontvangen data
        generated_html = generate_vacature_text_as_html(
            functie=data['functie'],
            organisatie=data['organisatie'],
            salaris=data['salaris'],
            secundaire_arbeidsvoorwaarden=data['secundaire_arbeidsvoorwaarden'],
            specifieke_taken=data['specifieke_taken'],
            soft_skills=data['soft_skills'],
            hard_skills=data['hard_skills'],
            organisatie_cultuur=data['organisatie_cultuur'],
            collegas=data['collegas'],
            geschiedenis=data['geschiedenis'],
            sector=data['sector'],
            kernactiviteit=data['kernactiviteit'],
            doelen=data['doelen'],
            missie_visie_kernwaarden=data['missie_visie_kernwaarden'],
            maatschappelijke_bijdrage=data['maatschappelijke_bijdrage']
        )
        
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
            return jsonify({
                'success': False,
                'error': 'No CV file uploaded'
            }), 400

        cv_file = request.files['cv']
        vacancy_id = request.form.get('vacancy_id')

        # Hier zou je normaal de vacature details uit je database halen
        # Voor nu gebruiken we dummy data
        vacancy_details = {
            "1": {
                "title": "Senior React Developer",
                "required_skills": ["React", "TypeScript", "Node.js", "REST APIs"],
                "experience": "5+ years",
                "education": "Bachelor's degree in Computer Science or equivalent"
            },
            "2": {
                "title": "UX Designer",
                "required_skills": ["Figma", "User Research", "Wireframing", "Prototyping"],
                "experience": "3+ years",
                "education": "Bachelor's degree in Design or equivalent"
            },
            "3": {
                "title": "Product Manager",
                "required_skills": ["Agile", "Product Strategy", "Data Analysis", "Stakeholder Management"],
                "experience": "4+ years",
                "education": "Bachelor's degree in Business or equivalent"
            }
        }

        if vacancy_id not in vacancy_details:
            return jsonify({
                'success': False,
                'error': 'Invalid vacancy ID'
            }), 400

        # Extract text from PDF
        cv_text = extract_text_from_pdf(cv_file)
        
        # Analyze the match
        analysis_result = analyze_cv_match(cv_text, json.dumps(vacancy_details[vacancy_id]))
        
        # Parse the JSON response from GPT
        analysis_data = json.loads(analysis_result)
        
        return jsonify({
            'success': True,
            'match_percentage': analysis_data.get('match_percentage', 0),
            'matching_skills': analysis_data.get('matching_skills', []),
            'missing_skills': analysis_data.get('missing_skills', []),
            'recommendations': analysis_data.get('recommendations', '')
        })

    except Exception as e:
        print(f"Error in analyze_match: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("Starting Flask server...")  # Debug logging
    app.run(debug=True, port=5000) 