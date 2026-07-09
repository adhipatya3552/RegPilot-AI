import requests
import os
from dotenv import load_dotenv

load_dotenv()

response = requests.post(
    "https://api.fireworks.ai/inference/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.getenv('FIREWORKS_API_KEY')}",
        "Content-Type": "application/json"
    },
    json={
        "model": "accounts/fireworks/models/deepseek-v4-flash",
        "messages": [{"role": "user", "content": "Say: Fireworks API working!"}],
        "max_tokens": 20
    }
)
print(response.json()["choices"][0]["message"]["content"])