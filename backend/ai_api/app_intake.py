
from flask import Flask, render_template, request, jsonify
import os
import speech_recognition as sr
from pydub import AudioSegment
import openai
from dotenv import load_dotenv
import librosa
import soundfile as sf
import numpy as np
import multiprocessing

# Laad omgevingsvariabelen uit .env bestand
load_dotenv()

app = Flask(__name__)

# Stel de API-sleutel in voor OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Route voor de html pagina
@app.route('/')
def speech_to_text():
    return render_template('speech_to_text_intake.html')

# Functie om ruis te verminderen
def reduce_noise(audio_path):
    # Laad audio met librosa
    audio, sr = librosa.load(audio_path, sr=None)
    
    # Pas een eenvoudig ruisfilter toe (pre-emphasis filter als voorbeeld)
    filtered_audio = librosa.effects.preemphasis(audio)

    # Sla gefilterde audio op
    filtered_path = audio_path.replace('.wav', '_filtered.wav')
    sf.write(filtered_path, filtered_audio, sr)
    return filtered_path

# Route om audio te uploaden en te transcriberen
@app.route('/transcribe', methods=['POST'])
def transcribe():
    recognizer = sr.Recognizer()
    audio_file = request.files.get('audio')

    if not audio_file:
        return jsonify({'error': 'Geen bestand ontvangen'}), 400

    audio_path = os.path.join('audio', 'recordings', 'audio.wav')
    
    # Log de naam van het bestand en het pad
    print(f"Bestand ontvangen: {audio_file.filename}")
    print(f"Opslaan naar: {audio_path}")
    
    # Zorg ervoor dat de map bestaat
    os.makedirs(os.path.dirname(audio_path), exist_ok=True)
    
    try:
        # Sla het ontvangen bestand op
        audio_file.save(audio_path)
        
        # Converteer audio naar het juiste formaat
        audio = AudioSegment.from_file(audio_path)
        audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)  # 16 kHz, mono, 16-bit
        audio.export(audio_path, format="wav")
        
        # Splitsen van lange audio in kleinere segmenten
        segment_duration = 300000  # 5 minuten per segment
        transcripts = []
        for i, segment in enumerate(range(0, len(audio), segment_duration)):
            segment_audio = audio[segment:segment + segment_duration]
            segment_path = os.path.join('audio', 'recordings', f'segment_{i}.wav')
            segment_audio.export(segment_path, format="wav")

            # Pas ruisvermindering toe
            filtered_segment_path = reduce_noise(segment_path)

            # Transcribeer elk segment afzonderlijk
            try:
                with sr.AudioFile(filtered_segment_path) as source:
                    recognizer.adjust_for_ambient_noise(source, duration=1)  # Pas voor ruis aan
                    audio_data = recognizer.record(source)
                    text = recognizer.recognize_google(audio_data, language='nl-NL')
                    print(f"Getranscribeerde tekst (segment {i}): {text}")
                    transcripts.append(text)
            except sr.RequestError as e:
                print(f"Spraakherkenning API probleem: {str(e)}")
                return jsonify({'error': f'Spraakherkenning API probleem: {str(e)}'}), 500
            except sr.UnknownValueError:
                print("Geen spraak herkend in het segment.")
                transcripts.append("[Onherkenbare spraak]")

        # Voeg alle segmenten samen
        full_transcript = ' '.join(transcripts)
        return jsonify({'transcription': full_transcript})

    except FileNotFoundError as e:
        print(f"Bestand niet gevonden: {str(e)}")
        return jsonify({'error': f'Bestand niet gevonden: {str(e)}'}), 500
    except Exception as e:
        print(f"Fout bij converteren of transcriberen: {str(e)}")
        return jsonify({'error': f'Fout bij converteren of transcriberen: {str(e)}'}), 500

# Route om tekst samen te vatten
@app.route('/summarize', methods=['POST'])
def summarize():
    text = request.json.get('text', '')

    if text:
        try:
            # Promt voor het samenvatten van een intakegesprek bij een klant
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # of gebruik "gpt-4" als beschikbaar
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "Je bent een assistent die een transcriptie samenvat van een gesprek over een vacature en de organisatie. "
                            "Het gesprek kan lang zijn en veel ruis bevatten. "
                            "Richt je alleen op het ophalen van de volgende details en vermeld duidelijk als een element niet is genoemd: "
                            "1. Waarom zou iemand bij deze organisatie willen werken? "
                            "2. Hoe zou de organisatie in drie zinnen omschreven worden? "
                            "3. Wat vertel je op een verjaardag over waar je werkt? "
                            "4. Wat had je zelf graag willen weten voordat je hier begon? "
                            "5. Afdelingsomschrijving: samenstelling van het team, plaats van de afdeling in de organisatie, soorten functies, sfeer in het team. "
                            "6. Wat speelt er? Wat is er aan de hand? Hoe is deze positie ontstaan? "
                            "7. Wat maakt deze functie/rol heel leuk? "
                            "8. Wat maakt het minder leuk? "
                            "9. Wat moet er gebeuren? "
                            "10. Omschrijving van de ideale persoon: branche, jaren ervaring, persoonlijkheid, functies, etc. "
                            "11. Wat moet de persoon meebrengen: kennis en ervaring, wat is must-have en wat is aan te leren? "
                            "12. Vereiste vaardigheden: wet- en regelgeving, systeemkennis. "
                            "13. Welke competenties zijn het meest belangrijk voor de kandidaat? "
                            "14. Salarisindicatie/salarisschaal? "
                            "15. Secundaire arbeidsvoorwaarden: opleiding, ontwikkeling, auto, telefoon, laptop, pensioen, reiskosten, vakantiedagen, thuiswerkmogelijkheden, bonus, 13e maand, cafetaria model. "
                            "16. Aantal medewerkers (totaal) "
                            "17. Gemiddelde leeftijd "
                            "18. Jaar van oprichting "
                            "Als een van deze aspecten niet wordt genoemd, geef dan 'Geen relevante informatie benoemd' voor dat aspect. "
                            "Geef alleen feitelijke informatie uit de transcriptie en verzin niets."
                        )
                    },
                    {
                        "role": "user",
                        "content": f"Hier is de transcriptie die je moet samenvatten:\n\n{text}"
                    }
                ],
                max_tokens=1250,  # Pas het aantal tokens aan indien nodig voor langere samenvattingen
                temperature=0.5,  # Houd de temperatuur laag voor consistente resultaten
            )

            # Haal de gegenereerde samenvatting op uit het antwoord
            summary = response.choices[0].message.content
            return jsonify({'summary': summary})
        
        except Exception as e:
            print(f"Fout bij samenvoegen van tekst: {str(e)}")
            if 'insufficient_quota' in str(e):
                return jsonify({'error': 'Quota overschreden. Controleer je OpenAI-plan en -facturering.'}), 403
            return jsonify({'error': f'Fout bij samenvoegen van tekst: {str(e)}'}), 500
    return jsonify({'error': 'Geen tekst ontvangen'}), 400

# Route om persona te schrijven
@app.route('/persona', methods=['POST'])
def persona():
    text = request.json.get('text', '')
    if text:
        try:
            # Aangepaste prompt om alleen relevante informatie over de kandidaat samen te vatten
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # of gebruik "gpt-4" als beschikbaar
                messages=[
                    {
                    "role": "system",
                    "content": (
                        "Je bent een assistent die helpt bij het creëren van een persona voor recruitment op basis van de samenvatting van een intakegesprek. "
                        "Gebruik alleen feitelijke informatie uit de samenvatting en vul de volgende elementen in. "
                        "Als bepaalde informatie niet wordt genoemd, laat het veld dan leeg: "
                        "\n\n"
                        "Persona (sjabloon):\n\n"
                        "Algemeen:\n"
                        "Naam: [fictieve naam]\n"
                        "Leeftijd: [Vul in of laat leeg]\n"
                        "Opleidingsniveau: [Vul in of laat leeg]\n"
                        "Functie: [Vul in of laat leeg]\n"
                        "Woonplaats: [Vul in of laat leeg]\n"
                        "Situatie: [Omschrijf de huidige werksituatie of persoonlijke omstandigheden]\n"
                        "Type persoon: [Bijv. 'doener', 'denker', etc.]\n\n"
                        "Interesses & hobby’s: [Vul in op basis van wat genoemd is]\n\n"
                        "Waarden en overtuigingen: [Beschrijf kernwaarden en overtuigingen van deze persoon]\n\n"
                        "Levensstijl: [Bijv. werk-privébalans, flexibiliteit, enz.]\n\n"
                        "Belangrijkste competenties: [Vul in op basis van de samenvatting]\n\n"
                        "Social media gebruik: [Welke platforms deze persoon mogelijk gebruikt]\n\n"
                        "Carrièrewensen & behoeften: [Beschrijf carrière-ambities en werkgerelateerde behoeften]\n\n"
                        "Redenen voor overstap naar nieuwe werkgever: [Waarom deze persoon mogelijk een overstap overweegt]\n\n"
                        "Frustraties: [Wat frustreert deze persoon in de huidige werkomgeving]\n"
                        )
                    },
                    {
                        "role": "user",
                        "content": f"Hier is de transcriptie waar je een persona van moet maken:\n\n{text}"
                    }
                ],
                max_tokens=1250,  # Pas het aantal tokens aan indien nodig voor langere samenvattingen
                temperature=0.5,  # Houd de temperatuur laag voor consistente resultaten
            )

            # Haal de gegenereerde persona op uit het antwoord
            persona = response.choices[0].message.content
            return jsonify({'persona': persona})
        except Exception as e:
            print(f"Fout bij samenvoegen van tekst: {str(e)}")
            if 'insufficient_quota' in str(e):
                return jsonify({'error': 'Quota overschreden. Controleer je OpenAI-plan en -facturering.'}), 403
            return jsonify({'error': f'Fout bij samenvoegen van tekst: {str(e)}'}), 500
    return jsonify({'error': 'Geen tekst ontvangen'}), 400

#TODOS:
#1). Maak een list (variabele) met alle persoonlijkheidsfactoren
#2). Maak een list (variabele) met alle mogelijke competenties
#3). Kijk welke persoonlijkheidsfactoren/competenties benoemd zijn in het gesprek
#4). Maak variabele van 3* en gebruik dit om de persona te koppelen en ook voor matching later
 
if __name__ == '__main__':
    # Probeer de multiprocessing startmethode in te stellen
    try:
        multiprocessing.set_start_method('spawn')  # of 'spawn' als 'fork' niet werkt
    except RuntimeError:
        pass  # 'fork' kan al zijn ingesteld

    app.run(debug=True, threaded=True)