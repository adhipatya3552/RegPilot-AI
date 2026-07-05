import chromadb
from sentence_transformers import SentenceTransformer
import os

model = SentenceTransformer("all-MiniLM-L6-v2")
client = chromadb.Client()
collection = client.get_or_create_collection("regulations")

REGULATIONS_DIR = os.path.join(os.path.dirname(__file__), "../regulations")

def load_regulations():
    if collection.count() > 0:
        return
    for filename in os.listdir(REGULATIONS_DIR):
        if filename.endswith(".txt"):
            with open(os.path.join(REGULATIONS_DIR, filename)) as f:
                lines = [l.strip() for l in f.readlines() if l.strip() and not l.startswith("-") == False]
                for i, line in enumerate(lines):
                    if line.startswith("-"):
                        embedding = model.encode(line).tolist()
                        collection.add(
                            documents=[line],
                            embeddings=[embedding],
                            ids=[f"{filename}_{i}"],
                            metadatas=[{"source": filename}]
                        )

def query_regulations(idea: str, n=10) -> list:
    load_regulations()
    embedding = model.encode(idea).tolist()
    results = collection.query(query_embeddings=[embedding], n_results=n)
    return results["documents"][0]