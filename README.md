# RegPilot AI ⚖️

Check your startup idea against global regulations instantly.
No lawyers. No waiting. Just paste your idea and get a compliance gap report in seconds.

🔗 **Live Demo:** [your-vercel-url-here]

---

## What it does

Paste any startup idea → select your region → get:
- **Compliance gaps** across GDPR, India DPDP Act, CCPA, EU AI Act, SOC2
- **Severity rating** (High / Medium / Low) per issue
- **Concrete action steps** with timelines
- **Overall risk score** for your idea

---

## Tech Stack

| Layer | Tool |
|---|---|
| LLM | Groq API (Llama 3.3 70B) |
| RAG | ChromaDB + Sentence Transformers |
| Backend | FastAPI |
| Frontend | Next.js + Tailwind CSS |
| Deploy | Render (backend) + Vercel (frontend) |

---

## Run Locally

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# Add GROQ_API_KEY to .env
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
# Add NEXT_PUBLIC_API_URL=http://localhost:8000 to .env.local
npm run dev
```

**Docker:**
```bash
docker-compose up --build
```

---

## Agent Pipeline
User Idea → FastAPI → Compliance Agent (RAG + Groq) → Action Agent (Groq) → JSON Report → Next.js UI

---

## Supported Regulations

- 🇪🇺 GDPR (EU)
- 🇮🇳 DPDP Act (India)
- 🇺🇸 CCPA (California)
- 🌍 EU AI Act
- 🔐 SOC2

---

## ⚠️ Disclaimer

This tool provides AI-generated guidance only — not legal advice.
Always consult a qualified lawyer before making compliance decisions.

---

## Author

Built by [@adhipatya3552](https://github.com/adhipatya3552)