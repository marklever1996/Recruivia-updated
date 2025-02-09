from openai import OpenAI
import json
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def get_ai_response(message, candidate_data=None, conversation_history=None):
    """
    Genereert een context-aware antwoord, met of zonder kandidaat data
    """
    try:
        # Basis system prompt zonder kandidaat data
        system_prompt = """
        Je bent een AI assistent voor Recruivia, een innovatief recruitment platform. 
        
        Over Recruivia:
        - Een modern platform voor recruiters en HR professionals
        - Helpt bij het efficiënt werven en matchen van kandidaten
        - Biedt features zoals AI-matching, video interviews, en kandidaat tracking
        - Focus op gebruiksvriendelijkheid en data-gedreven recruitment
        
        Belangrijke regels:
        1. Geef duidelijke, behulpzame antwoorden
        2. Als je iets niet weet, zeg dat eerlijk
        3. Spreek in natuurlijk Nederlands
        4. Wees professioneel maar vriendelijk
        """

        # Voeg kandidaat data toe als die beschikbaar is
        if candidate_data:
            system_prompt += f"\n\nKandidaat informatie:\n{json.dumps(candidate_data, indent=2, ensure_ascii=False)}"

        messages = [
            {"role": "system", "content": system_prompt},
        ]

        # Voeg conversation history toe als die beschikbaar is
        if conversation_history:
            messages.extend(conversation_history)

        messages.append({"role": "user", "content": message})

        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7,
            max_tokens=300
        )

        return response.choices[0].message.content

    except Exception as e:
        print(f"Error in chat service: {str(e)}")
        return "Er lijkt iets mis te gaan met de verbinding. Probeer het over een paar minuten opnieuw of neem contact op met de support als het probleem aanhoudt." 