import requests, os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("FIREWORKS_API_KEY")
BASE_URL = os.getenv("FIREWORKS_BASE_URL", "https://api.fireworks.ai/inference/v1")
MODEL = os.getenv("ALLOWED_MODELS", "accounts/fireworks/models/deepseek-v4-flash").split(",")[0]

def call_llm(prompt: str, json_mode: bool = False) -> str:
    messages = []
    if json_mode:
        messages.append({
            "role": "system",
            "content": "You are a compliance expert. You MUST respond with a JSON object matching the requested schema. Do not include markdown code block syntax (like ```json ... ```) or any conversational text around the JSON."
        })
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": MODEL,
        "messages": messages,
        "max_tokens": 2048
    }
    if json_mode:
        payload["response_format"] = {"type": "json_object"}

    response = requests.post(
        f"{BASE_URL}/chat/completions",
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        json=payload
    )
    return response.json()["choices"][0]["message"]["content"]