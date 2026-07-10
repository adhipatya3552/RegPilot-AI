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
    
    all_documents = []
    all_ids = []
    all_metadatas = []
    
    for filename in os.listdir(REGULATIONS_DIR):
        if filename.endswith(".txt"):
            filepath = os.path.join(REGULATIONS_DIR, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                # Keep lines starting with '-'
                lines = [l.strip() for l in f.readlines() if l.strip() and l.strip().startswith("-")]
                for i, line in enumerate(lines):
                    all_documents.append(line)
                    all_ids.append(f"{filename}_{i}")
                    all_metadatas.append({"source": filename})
                    
    if all_documents:
        # Encode all clauses in a single batch to maximize CPU utilization and reduce start latency
        all_embeddings = model.encode(all_documents).tolist()
        collection.add(
            documents=all_documents,
            embeddings=all_embeddings,
            ids=all_ids,
            metadatas=all_metadatas
        )

def query_regulations(idea: str, region: str = "global", n=10) -> list:
    load_regulations()
    embedding = model.encode(idea).tolist()
    
    # Filter by source files depending on region
    where = None
    if region == "india":
        where = {"source": "dpdp.txt"}
    elif region == "eu":
        where = {"source": {"$in": ["gdpr.txt", "eu_ai_act.txt"]}}
    elif region == "us":
        where = {"source": {"$in": ["ccpa.txt", "soc2.txt"]}}
        
    if where:
        results = collection.query(query_embeddings=[embedding], n_results=n, where=where)
    else:
        results = collection.query(query_embeddings=[embedding], n_results=n)
    return results["documents"][0]