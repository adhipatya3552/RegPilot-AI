import requests
import os
from dotenv import load_dotenv

load_dotenv()

response = requests.post(
    "https://api.groq.com/openai/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": "Say: Groq working!"}],
        "max_tokens": 20
    }
)
print(response.json()["choices"][0]["message"]["content"])