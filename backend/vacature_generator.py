import openai
import json
from dotenv import load_dotenv

load_dotenv()

# Laad de gelabelde voorbeelden voor few-shot learning
def load_few_shots():
    with open('data/labeled_vacatures.json') as f:
        return json.load(f)

# Maak de few-shot prompt voor vacaturegeneratie
def create_few_shot_prompt(
        #Dit is de invulwaarden van vacatures_form.html
        functie, 
        organisatie, 
        salaris, 
        secundaire_arbeidsvoorwaarden, 
        specifieke_taken, 
        soft_skills,
        hard_skills,
        organisatie_cultuur, 
        collegas,
        geschiedenis,
        sector,
        kernactiviteit,
        doelen,
        missie_visie_kernwaarden,
        maatschappelijke_bijdrage
        ):
    
    few_shots = load_few_shots()

    # Begin de prompt met enkele voorbeelden
    prompt = "Hier zijn enkele gestructureerde vacatureteksten:\n\n"

    for vacature in few_shots[:5]:  # Gebruik de eerste 5 voorbeelden
        prompt += (
        f"{vacature['introductie']}\n\n"
        f"<strong>Wat ga je doen als {vacature['functie']}</strong>:\n"
        f"{vacature['wat_je_gaat_doen']['paragraaf_1']}\n"
        f"Daarnaast ben je verantwoordelijk voor:\n"
    )
    for bullet in vacature['wat_je_gaat_doen']['bulletpoints']:
        prompt += f"- {bullet}\n"
    prompt += ""

    prompt += (
        f"<strong>Waarom wil jij werken bij {vacature['organisatie']}</strong>:\n"
        f"{vacature['waarom_hier_werken']['paragraaf_1']}\n\n"
        f"<strong>Waarom wil jij werken bij {vacature['organisatie']}</strong>:\n"
        f"<strong>Wie ben jij</strong>:\n"
        f"{vacature['wie_ben_jij']['soft_skills']}\n"
        f"Verder beschik je over:\n"
    )
    for skill in vacature['wie_ben_jij']['hard_skills']:
        prompt += f"- {skill}\n"
    prompt += ""

    prompt += (
        f"<strong>Word jij hier blij van</strong>:\n"
        f"{vacature['arbeidsvoorwaarden']['intro']}\n\n"
        f"Daarnaast krijg je:\n"
    )
    for benefit in vacature['arbeidsvoorwaarden']['bulletpoints']:
        prompt += f"- {benefit}\n"
    prompt += ""

    prompt += f"Afsluiting: {vacature['arbeidsvoorwaarden']['afsluiting']}\n\n\n"

     # Voeg de nieuwe vacature toe die je wilt genereren
    prompt += (
        f"Maak nu een vacature voor de volgende functie:\n\n"
        f"Functie: {functie}\n\n"
        f"Organisatie: {organisatie}\n\n"
        f"Salaris: {salaris}\n\n"
        f"Secundaire arbeidsvoorwaarden: {secundaire_arbeidsvoorwaarden}\n\n"
        f"Specifieke Taken: {specifieke_taken}\n\n"
        f"Soft skills kandidaat: {soft_skills}\n\n"
        f"Hard skills kandidaat: {hard_skills}\n\n"
        f"Organisatie Cultuur: {organisatie_cultuur}\n\n"
        f"Collega's waarmee je komt te werken: {collegas}\n\n"
        f"Geschiedenis van de organisatie: {geschiedenis}\n\n"
        f"Sector van de organisatie: {sector}\n\n"
        f"Kernactiviteit van de organisatie: {kernactiviteit}\n\n"
        f"Strategische doelen van de organisatie: {doelen}\n\n"
        f"Missie, visie en kerwaarden van de organisatie: {missie_visie_kernwaarden}\n\n"
        f"Maatschappelijke bijdrage van de functie: {maatschappelijke_bijdrage}\n\n"
        "Structureer het op dezelfde manier als de voorbeelden."
    )

    # Instructies voor de gegenereerde tekst
    prompt += (
    "De vacaturetekst moet voldoen aan de volgende eisen:"
    "- De tekst moet tussen de 500 en 600 woorden lang zijn."
    "- Gebruik witruimte en duidelijke koppen voor een professionele opmaak."
    "- Zorg ervoor dat de taal duidelijk en beknopt is, met een positieve en uitnodigende toon."
    "- Vermijd jargon en complexe zinnen om de tekst toegankelijk te maken voor een breed publiek."
    "- De tekst moet aantrekkelijk zijn voor potentiële kandidaten en hen aanmoedigen om te solliciteren."
    "- Gebruik actieve werkwoorden en een directe aanspreekvorm om de betrokkenheid te vergroten."
    "- Controleer op grammaticale en typografische fouten voordat je de tekst retourneert."
    "- Functie (titel) komt minimaal 5 keer terug in de tekst."
    "- Functies hebben geen hoofdletter en afdeling wel."
    "- De volgende woorden mogen niet gebruikt worden in de vacaturetekst: flexibel, uitdagend, uitdaging, op zoek, opzoek naar, innovatief, innovatieve, creatief, creativiteit."
    "- De vacaturetekst bevat geen zinnen die langer zijn dan 20 woorden."
    "- Alle afkortingen zijn voluit geschreven in de vacaturetekst."
    "- Schrijf de vacaturetekst vanuit de jij-vorm."
    )

    # Werkinstructies voor de vacaturetekst
    prompt += (
    "Werkinstructies voor de vacaturetekst:\n"
    "- De introductie is 50 - 60 woorden lang.\n" 
    "Zin 1: Beschrijf de {maatschappelijke_bijdrage} van de functie. Als dit niet benoemd is, beschrijf dan wat deze functie uniek maakt. De functietitel en organisatie moet benoemd worden in zin 1.\n"
    "In de overige zinnen van de introductie wordt verteld waarom deze functie interessant kan zijn voor de sollicitant. Denk hier aan {secundaire_arbeidsvoorwaarden}, zoals thuiswerkmogelijkheden, individueel keuzebudget, opleidingsmogelijkheden, maar ook {organisatie_cultuur} is een mogelijkheid als dit uniek is.\n"
    
    "- Het hoofdstuk 'Wat ga je doen als {functie}' is 150 - 180 woorden lang en bestaat uit 2 alinea's. In de eerste alinea beschrijf je de kerntaken en verantwoordelijkheden van de functie. In de tweede alinea benoem je specifieke taken en mogelijke uitdagingen die bij de functie horen.\n"
    "Alinea 1:\n"
    "Zin 1: Beschrijf de kern van de functie; waar ga je je mee bezig houden als {functie} binnen {organisatie}?\n"
    "Zin 2: Beschrijf hoe je de kern van de functie gaat vervullen. Vervolg van zin 1.\n"
    "Zin 3: Beschrijf de afdeling waarin je gaat werken en met wie je gaat werken, oftewel {collegas}.\n"
    "Zin 4, zin 5: Vervolg zin 3. Beschrijf wat je als team gaat doen en welke rol je in de organisatie hebt met zijn allen\n."
    "Alinea 2:\n"
    "Zin 1: Een inleidende zin, zoals: Dit ga je doen:, Je gaat je bezighouden met:, of een vergelijkbare zin.\n"
    "Beschrijf vervolgens met bulletpoints de {specifieke_taken}."
    "Alinea 1 en alinea 2 mogen niet dezelfde informatie bevatten. De {specifieke_taken} moeten verschillen met de informatie die in alinea 1 is beschreven."

    "- Het hoofdstuk 'Waarom wil jij werken bij {organisatie}' is 95 - 115 woorden lang en bestaat uit 2 alinea's.\n"
    "Alinea 1:\n"
    "Zin 1: Beschrijf kort {geschiedenis}.\n"
    "Zin 2: Noem de {kernactiviteit}, of betrokkenheid van de organisatie binnen haar {sector}\n"
    "Zin 3: Leg de {doelen} uit.\n"
    "Schrijf alinea 1 voor financials; vermijdt niet-financial vaktermen."
    "Alinea 2:\n"
    "Zin 1: Beschrijf de {organisatie_cultuur} binnen de organisatie.\n"
    "Zin 2: Noem de belangrijkste kernwaarden die de cultuur of werkomgeving beïnvloeden.\n"
    "Zin 3: Geef aan hoe de organisatie investeert in de ontwikkeling van haar medewerkers.\n"
    "Zin 4: Verwijs naar de focus op het welzijn en de groei van medewerkers.\n"
    "Zin 5: Eindig met een uitnodiging of motivatie over hoe medewerkers een actieve bijdrage kunnen leveren aan het succes van de organisatie, binnen een samenwerkingsgerichte omgeving.\n"

    "- Het hoofdstuk 'Wie ben jij?' is 60 - 80 woorden lang en bestaat uit 2 alinea's.\n"
    "Alinea 1:\n"
    "In alinea 1 worden de {soft_skills} beschreven die van belang zijn om goed te functioneren in de functie.\n"
    "Alinea 2 begint met de zin: 'Verder beschik jij over:' Hieronder staan de {hard_skills} (functie-eisen) in bulletpoints."
    
    "- Het hoofdstuk 'Word jij hier blij van?' is 115 - 135 woorden lang en bestaat uit 3 alinea's.\n"
    "Alinea 1:\n"
    "Zin 1: Beschrijf de {maatschappelijke_bijdrage} van de functie of het doel van de rol binnen de organisatie.\n"
    "Alternatief: Leg uit hoe de functie bijdraagt aan het behalen van de {doelen}\n"
    "Zin 2: Noem de kansen of mogelijkheden voor persoonlijke of professionele ontwikkeling, zoals trainingen of opleidingen.\n"
    "Alternatief: Verwijs naar doorgroeimogelijkheden of andere voordelen zoals een individueel keuzebudget of flexibiliteit in werktijden.\n"
    "Alinea 2:\n"
    "Zin 1: Beschrijf de {organisatie_cultuur}, waarbij de nadruk ligt op samenwerking en steun van collega's.\n"
    "Alternatief: Beschrijf {missie_visie_kernwaarden}, zoals innovatie, duurzaamheid, of klantgerichtheid.\n"
    "Zin 2: Benoem de vrijheid om eigen initiatieven te nemen en te ontwikkelen.\n"
    "Alternatief: Beschrijf een cultuur van betrokkenheid waarin iedereen de kans krijgt om bij te dragen aan de besluitvorming of te werken aan uitdagende projecten.\n"
    "Zin 3: Verwijs naar de beschikbare middelen en ondersteuning om deze initiatieven succesvol uit te voeren.\n"
    "Alternatief: Verwijs naar mentoring of coaching binnen de organisatie, of naar de ondersteuning van een sterk team om gezamenlijke successen te boeken.\n"
    "Alinea 3:\n"
    "Beschrijf in bulletpoints onder elkaar de {secundaire_arbeidsvoorwaarden}. Minimaal 2, maximaal 5"
    )
    
    return prompt

def format_as_html(text):
    text = text.replace("\n\n", "<br><br>")  # Replace double newlines with HTML line breaks
    text = text.split("\n")
    formatted_text = ""
    for line in text:
        if line.startswith("- "):
            formatted_text += f"<li>{line[2:].strip()}</li>"  # Strip the bullet point and format as a list item
        else:
            formatted_text += f"<p>{line.strip()}</p>"  # Wrap non-bullet lines in paragraph tags
    return f"<ul>{formatted_text}</ul>"  # Wrap all list items in an unordered list

# Genereer de vacaturetekst als HTML
def generate_vacature_text_as_html(
        functie, 
        organisatie, 
        salaris, 
        secundaire_arbeidsvoorwaarden, 
        specifieke_taken, 
        soft_skills,
        hard_skills, 
        organisatie_cultuur, 
        collegas,
        geschiedenis,
        sector,
        kernactiviteit,
        doelen,
        missie_visie_kernwaarden,
        maatschappelijke_bijdrage
        ):
    
    # Maak de prompt voor vacaturegeneratie
    prompt = create_few_shot_prompt(
        functie, 
        organisatie, 
        salaris, 
        secundaire_arbeidsvoorwaarden, 
        specifieke_taken, 
        soft_skills,
        hard_skills,
        organisatie_cultuur, 
        collegas,
        geschiedenis,
        sector,
        kernactiviteit,
        doelen,
        missie_visie_kernwaarden,
        maatschappelijke_bijdrage
    )

    messages = [
        {"role": "system", "content": "Je bent een assistent die helpt bij het genereren van vacatureteksten."},
        {"role": "user", "content": prompt}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages,
            max_tokens=1250,
            temperature=1.1,
        )

        generated_text = response['choices'][0]['message']['content'].strip()
        
        # Converteer naar HTML
        formatted_html_text = format_as_html(generated_text)

        return formatted_html_text
    except Exception as e:
        print(f"Error generating vacature text: {e}")
        return "<p>Er is een fout opgetreden bij het genereren van de vacature. Probeer het later opnieuw.</p>"
