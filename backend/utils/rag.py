import os
import json
import math
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("FIREWORKS_API_KEY")
BASE_URL = os.getenv("FIREWORKS_BASE_URL", "https://api.fireworks.ai/inference/v1")

REGULATIONS_DIR = os.path.join(os.path.dirname(__file__), "../regulations")
CACHE_FILE = os.path.join(os.path.dirname(__file__), "../regulations_cache.json")

regulations_db = []

def get_embedding(text: str) -> list:
    response = requests.post(
        f"{BASE_URL}/embeddings",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "nomic-ai/nomic-embed-text-v1.5",
            "input": text
        }
    )
    response.raise_for_status()
    return response.json()["data"][0]["embedding"]

def get_embeddings_batch(texts: list) -> list:
    response = requests.post(
        f"{BASE_URL}/embeddings",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "nomic-ai/nomic-embed-text-v1.5",
            "input": texts
        }
    )
    response.raise_for_status()
    return [item["embedding"] for item in response.json()["data"]]

def load_regulations():
    global regulations_db
    if regulations_db:
        return
    
    # Try loading from cache first
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                regulations_db = json.load(f)
                if regulations_db:
                    return
        except Exception:
            pass
            
    # Cache missing or corrupted; rebuild it
    all_documents = []
    all_ids = []
    all_metadatas = []
    
    for filename in os.listdir(REGULATIONS_DIR):
        if filename.endswith(".txt"):
            filepath = os.path.join(REGULATIONS_DIR, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                lines = [l.strip() for l in f.readlines() if l.strip() and l.strip().startswith("-")]
                for i, line in enumerate(lines):
                    all_documents.append(line)
                    all_ids.append(f"{filename}_{i}")
                    all_metadatas.append({"source": filename})
                    
    if all_documents:
        embeddings = get_embeddings_batch(all_documents)
        
        regulations_db = []
        for doc, emb, doc_id, meta in zip(all_documents, embeddings, all_ids, all_metadatas):
            regulations_db.append({
                "id": doc_id,
                "document": doc,
                "embedding": emb,
                "metadata": meta
            })
            
        try:
            with open(CACHE_FILE, "w", encoding="utf-8") as f:
                json.dump(regulations_db, f, indent=2)
        except Exception:
            pass

def dot_product(v1, v2):
    return sum(x * y for x, y in zip(v1, v2))

def magnitude(v):
    return math.sqrt(sum(x * x for x in v))

def cosine_similarity(v1, v2):
    mag1 = magnitude(v1)
    mag2 = magnitude(v2)
    if not mag1 or not mag2:
        return 0.0
    return dot_product(v1, v2) / (mag1 * mag2)

def query_regulations(idea: str, region: str = "global", n=10) -> list:
    load_regulations()
    if not regulations_db:
        return []
        
    query_emb = get_embedding(idea)
    
    allowed_sources = None
    if region == "india":
        allowed_sources = {"dpdp.txt"}
    elif region == "eu":
        allowed_sources = {"gdpr.txt", "eu_ai_act.txt"}
    elif region == "us":
        allowed_sources = {"ccpa.txt", "soc2.txt"}
        
    filtered_db = regulations_db
    if allowed_sources:
        filtered_db = [item for item in regulations_db if item["metadata"]["source"] in allowed_sources]
        
    scored_items = []
    for item in filtered_db:
        sim = cosine_similarity(query_emb, item["embedding"])
        scored_items.append((sim, item["document"]))
        
    scored_items.sort(key=lambda x: x[0], reverse=True)
    return [doc for _, doc in scored_items[:n]]