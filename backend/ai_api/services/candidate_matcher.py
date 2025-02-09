from openai import OpenAI
import json
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def find_matching_candidates(candidate_data, all_candidates, num_matches=4):
    """Gebruik AI om de beste matches te vinden tussen kandidaten"""
    try:
        # Bereid de data voor voor de AI analyse
        prompt = f"""
        Analyseer deze kandidaat en vind de beste matches uit de kandidatenpool.
        Focus op vaardigheden, ervaring en rol-compatibiliteit.

        Huidige kandidaat:
        {json.dumps(candidate_data, indent=2)}

        Kandidatenpool:
        {json.dumps(all_candidates, indent=2)}

        Geef voor elke match een score en uitleg waarom ze matchen.
        Return het resultaat in dit format:
        {{
            "matches": [
                {{
                    "candidate_id": "id",
                    "match_score": 85,
                    "matching_points": [
                        "Reden 1 waarom ze matchen",
                        "Reden 2 waarom ze matchen",
                        "Reden 3 waarom ze matchen"
                    ]
                }}
            ]
        }}
        """

        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "Je bent een expert in het matchen van kandidaten op basis van hun vaardigheden en ervaring."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3
        )

        matches = json.loads(response.choices[0].message.content)
        if not isinstance(matches, dict) or 'matches' not in matches:
            return {
                'matches': []  # Leeg array als fallback
            }
        return matches

    except Exception as e:
        print(f"Error in candidate matching: {str(e)}")
        return {
            'matches': []  # Leeg array bij errors
        } 