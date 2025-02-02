from flask import Blueprint, request, jsonify
import os
import whisper
from pydub import AudioSegment
import tempfile

transcription_bp = Blueprint('transcription', __name__)

# Laad het Whisper model
model = whisper.load_model("base")

def convert_to_wav(file_path):
    """Convert uploaded audio/video to WAV format"""
    audio = AudioSegment.from_file(file_path)
    wav_path = tempfile.mktemp(suffix='.wav')
    audio.export(wav_path, format='wav')
    return wav_path

@transcription_bp.route('/api/transcribe', methods=['POST'])
def transcribe_audio():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'Geen bestand geüpload'}), 400
        
        file = request.files['file']
        conversation_type = request.form.get('conversationType', '')
        
        if not conversation_type:
            return jsonify({'error': 'Geen gesprekstype opgegeven'}), 400

        # Sla het bestand tijdelijk op
        temp_path = tempfile.mktemp(suffix='.' + file.filename.split('.')[-1])
        file.save(temp_path)

        # Converteer naar WAV als het nodig is
        wav_path = convert_to_wav(temp_path)

        # Transcribeer de audio
        result = model.transcribe(wav_path)

        # Verwijder tijdelijke bestanden
        os.remove(temp_path)
        os.remove(wav_path)

        return jsonify({
            'text': result['text'],
            'conversation_type': conversation_type,
            'segments': result['segments']
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500 