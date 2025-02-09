import openai
import json
import os
from dotenv import load_dotenv
from pathlib import Path

# Laad API-key
load_dotenv()
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Laad de gelabelde vacatures
def load_few_shots(sector):
    try:
        # Construeer het absolute pad naar het JSON-bestand
        current_dir = Path(__file__).parent.parent
        json_path = current_dir / 'data' / 'labeled_vacatures.json'
        
        print(f"Loading examples from: {json_path}")  # Debug logging
        
        with open(json_path, "r", encoding="utf-8") as f:
            all_examples = json.load(f)
        
        # Filter sector-specifieke voorbeelden
        sector_examples = [ex for ex in all_examples if ex.get("sector") == sector]
        
        # Als er geen sector-specifieke voorbeelden zijn, kies een algemene selectie
        return sector_examples[:3] if sector_examples else all_examples[:3]
    
    except Exception as e:
        print(f"Error loading examples: {str(e)}")
        # Return een lege lijst als fallback
        return []

# Dynamische prompt per sector
sector_guidelines = {
    "IT": "Benadruk technische vaardigheden, frameworks, en agile werken.",
    "Finance": "Benadruk compliance, regelgeving en risicobeheer.",
    "Zorg": "Benadruk patiëntenzorg, medische protocollen en empathie.",
    "Marketing": "Benadruk creativiteit, branding en data-analyse."
}

def create_few_shot_prompt(input_data):
    """
    Bouwt een gedetailleerde prompt met duidelijke instructies, gebaseerd op wetenschappelijke inzichten en jouw
    labeled vacaturevoorbeelden. De prompt geeft per alinea de gewenste lengte en inhoud weer.
    """
    sector = input_data.get("sector", "Algemeen")
    sector_text = sector_guidelines.get(sector, "Schrijf een professionele vacaturetekst.")
    examples = load_few_shots(sector)
    example_texts = "\n\n".join([f"Functie: {ex['functie']}\nOrganisatie: {ex['organisatie']}\n" for ex in examples])

    prompt = f"""
Je bent een expert in het schrijven van vacatureteksten met behulp van bewezen wetenschappelijke principes op het gebied van persuasieve communicatie, cognitieve belasting en doelgroepgerichte messaging. Schrijf een vacaturetekst in HTML-formaat die volledig in lijn is met de volgende richtlijnen en specificaties.

Algemene richtlijnen:
- De totale tekst moet tussen de 440 en 550 woorden bedragen.
- Gebruik een heldere HTML5-structuur met headers (<h1>, <h2>, etc.), paragrafen (<p>) en lijsten (<ul>, <li>).
- De toon moet formeel, professioneel en aansprekend zijn.
- Integreer zowel centrale als perifere cues om de aandacht van de lezer vast te houden.
- Segmenteer de informatie in overzichtelijke alinea's volgens de principes van chunking.

Structuur en inhoud van de tekst:
1. Introductie (ongeveer 80-100 woorden):
   - Benoem direct de functie en de organisatie, bijvoorbeeld: "Als {input_data['functie']} bij {input_data['organisatie']}..."
   - Beschrijf de unieke aspecten van de functie, zoals impact en specifieke voordelen.
2. Alinea 1 – Functie-inhoud en taken (ongeveer 120-150 woorden):
   - Introduceer de kernverantwoordelijkheden.
   - Beschrijf gedetailleerd de specifieke taken en verantwoordelijkheden.
   - Gebruik 3-4 bulletpoints om kernpunten te benadrukken, zoals:
     - Het opstellen van de wekelijkse cash- en dollarplanning.
     - Het analyseren van de value-chain.
     - Het bewaken van tijdige oplevering van het controledossier.
3. Alinea 2 – Organisatie en cultuur (ongeveer 80-100 woorden):
   - Geef een overzicht van de organisatie met nadruk op geschiedenis, positie in de markt en cultuur.
4. Alinea 3 – Kandidaatprofiel (ongeveer 100-120 woorden):
   - Beschrijf het gewenste profiel van de kandidaat.
   - Vermeld zowel de vereiste soft skills als hard skills, inclusief opleiding en ervaring.
5. Slot – Call-to-Action (ongeveer 60-80 woorden):
   - Vat de belangrijkste voordelen en verantwoordelijkheden samen.
   - Eindig met een duidelijke call-to-action waarin kandidaten worden uitgenodigd om te solliciteren.

Sector: {sector}
{sector_text}

Voorbeelden (few-shot):
{example_texts}

Gebruik de volgende inputinformatie:
- Functie: {input_data["functie"]}
- Locatie: {input_data["locatie"]}
- Organisatie: {input_data["organisatie"]}
- Salaris: {input_data["salaris"]}
- Uren: {input_data["uren"]}
- Secundaire arbeidsvoorwaarden: {input_data["secundaire_arbeidsvoorwaarden"]}
- Specifieke taken: {input_data["specifieke_taken"]}
- Soft skills: {input_data["soft_skills"]}
- Hard skills: {input_data["hard_skills"]}
- Organisatiecultuur: {input_data["organisatiecultuur"]}
- Team samenstelling: {input_data["team_samenstelling"]}
- Geschiedenis: {input_data["geschiedenis"]}
- Sector: {input_data["sector"]}
- Kernactiviteit: {input_data["kernactiviteit"]}
- Missie/Visie/Kernwaarden: {input_data["missie_visie_kernwaarden"]}
- Maatschappelijke bijdrage: {input_data["maatschappelijke_bijdrage"]}

Schrijf nu de volledige vacaturetekst in HTML volgens bovenstaande richtlijnen.
    """
    return prompt

def generate_vacature_text_as_html(input_data):
    """
    Genereert een vacaturetekst in HTML door gebruik te maken van de OpenAI API met een gedetailleerde prompt.
    """
    try:
        # Construeer de prompt met de uitgebreide instructies
        prompt = create_few_shot_prompt(input_data)
        print("Generated prompt (eerste 1000 tekens):", prompt[:1000])  # Debug logging

        # Roep de OpenAI API aan
        response = client.chat.completions.create(
            model="gpt-4o-mini",      
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        generated_text = response.choices[0].message.content
        return generated_text
    except Exception as e:
        print(f"Error in generate_vacature_text_as_html: {str(e)}")
        raise
