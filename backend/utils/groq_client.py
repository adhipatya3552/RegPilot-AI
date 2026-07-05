import requests, os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
MODEL = "llama-3.3-70b-versatile"

def call_llm(prompt: str) -> str:
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 1000
        }
    )
    return response.json()["choices"][0]["message"]["content"]