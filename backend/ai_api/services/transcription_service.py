from flask import Blueprint, request, jsonify
import os
from pydub import AudioSegment
import tempfile
from pyannote.audio import Pipeline
import whisper
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

transcription_bp = Blueprint('transcription', __name__)

# Laad het Whisper model (gebruik eventueel een groter model voor hogere nauwkeurigheid)
model = whisper.load_model("base")

# Initialiseer de pyannote diarization pipeline
diarization_pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization", 
    use_auth_token=os.getenv('HUGGING_FACE_TOKEN')
)

client = OpenAI()  # Dit initialiseert de client met OPENAI_API_KEY uit .env

def convert_to_wav(file_path):
    """Converteer geüploade audio/video naar WAV-formaat"""
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
        file_extension = file.filename.split('.')[-1]
        temp_path = tempfile.mktemp(suffix='.' + file_extension)
        file.save(temp_path)

        # Converteer naar WAV (indien nodig)
        wav_path = convert_to_wav(temp_path)

        # Voer speaker diarization uit op de gehele audio
        diarization = diarization_pipeline(wav_path)

        # Laad de volledige audio met pydub voor segment extractie
        full_audio = AudioSegment.from_wav(wav_path)

        transcript_segments = []

        # Itereer over de gedetecteerde segmenten
        for turn, _, speaker in diarization.itertracks(yield_label=True):
            # Bereken de start- en eindtijd in milliseconden
            start_ms = int(turn.start * 1000)
            end_ms = int(turn.end * 1000)

            # Extraheer het segment uit de volledige audio
            segment_audio = full_audio[start_ms:end_ms]

            # Sla het segment tijdelijk op voor transcriptie
            segment_temp_path = tempfile.mktemp(suffix='.wav')
            segment_audio.export(segment_temp_path, format='wav')

            # Transcribeer het segment met Whisper
            result = model.transcribe(segment_temp_path)

            # Voeg het resultaat toe aan de lijst
            transcript_segments.append({
                'speaker': speaker,
                'start': turn.start,
                'end': turn.end,
                'text': result.get('text', '').strip()
            })

            # Verwijder het tijdelijke segmentbestand
            os.remove(segment_temp_path)

        # Optioneel: bouw een volledige transcriptie op door de segmenten samen te voegen
        full_transcript = "\n".join([
            f"[{seg['speaker']} {seg['start']:.2f}-{seg['end']:.2f}]: {seg['text']}"
            for seg in transcript_segments
        ])

        # Verwijder de tijdelijke bestanden
        os.remove(temp_path)
        os.remove(wav_path)

        # Vervang de oude ChatCompletion.create met:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Je bent een AI recruitment assistent."},
                {"role": "user", "content": full_transcript}
            ]
        )

        # Access het antwoord via:
        answer = response.choices[0].message.content

        return jsonify({
            'conversation_type': conversation_type,
            'full_transcript': full_transcript,
            'segments': transcript_segments,
            'answer': answer
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
