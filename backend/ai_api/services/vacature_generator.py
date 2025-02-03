import openai
import json
from dotenv import load_dotenv
import os

load_dotenv()
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

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
    
    prompt = f"""
    Schrijf een professionele vacaturetekst in HTML format voor de volgende functie. 
    Gebruik duidelijke HTML structuur met headers, paragrafen en lijsten.
    Zorg voor een aantrekkelijke en leesbare layout.

    Gebruik deze HTML structuur:
    <div class="vacancy">
        <h1 class="vacancy-title">[Functietitel]</h1>
        
        <section class="intro">
            <p class="highlight">[Pakkende introductie]</p>
        </section>

        <section class="role-description">
            <h2>Wat ga je doen?</h2>
            <p>[Beschrijving]</p>
            <ul>
                <li>[Taken]</li>
            </ul>
        </section>

        <section class="offer">
            <h2>Wat bieden wij?</h2>
            <ul>
                <li>[Voordelen]</li>
            </ul>
        </section>

        <section class="requirements">
            <h2>Wie ben jij?</h2>
            <p>[Profiel]</p>
            <ul>
                <li>[Vereisten]</li>
            </ul>
        </section>

        <section class="company">
            <h2>Over {organisatie}</h2>
            <p>[Bedrijfsinformatie]</p>
        </section>

        <section class="cta">
            <p class="highlight">[Call to action]</p>
        </section>
    </div>

    Gebruik deze informatie:
    Functie: {functie}
    Organisatie: {organisatie}
    Salaris: {salaris}
    Secundaire arbeidsvoorwaarden: {secundaire_arbeidsvoorwaarden}
    Specifieke taken: {specifieke_taken}
    Soft skills: {soft_skills}
    Hard skills: {hard_skills}
    Organisatiecultuur: {organisatie_cultuur}
    Team: {collegas}
    Geschiedenis: {geschiedenis}
    Sector: {sector}
    Kernactiviteit: {kernactiviteit}
    Doelen: {doelen}
    Missie/Visie/Kernwaarden: {missie_visie_kernwaarden}
    Maatschappelijke bijdrage: {maatschappelijke_bijdrage}
    """

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

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Je bent een expert in het schrijven van vacatureteksten."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error in generate_vacature_text: {e}")
        raise e
