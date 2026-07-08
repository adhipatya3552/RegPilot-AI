import requests, os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("FIREWORKS_API_KEY")
BASE_URL = os.getenv("FIREWORKS_BASE_URL", "https://api.fireworks.ai/inference/v1")
MODEL = os.getenv("ALLOWED_MODELS", "accounts/fireworks/models/deepseek-v4-flash").split(",")[0]

def call_llm(prompt: str) -> str:
    response = requests.post(
        f"{BASE_URL}/chat/completions",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 1000
        }
    )
    return response.json()["choices"][0]["message"]["content"]