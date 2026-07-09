<div align="center">

# RegPilot AI — Compliance Copilot for Startups ⚖️

![RegPilot Logo](https://img.shields.io/badge/RegPilot--AI-Compliance%20Copilot-blue?style=for-the-badge&logo=codeforces&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100.0-emerald?style=for-the-badge&logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind--CSS-3.4-blueviolet?style=for-the-badge&logo=tailwindcss)
![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector--DB-orange?style=for-the-badge)
![Fireworks AI](https://img.shields.io/badge/Fireworks%20AI-DeepSeek--V4-darkblue?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker)

**Check your startup idea against global regulations instantly. No lawyers. No waiting. Just paste your idea and get a compliance gap report with actionable next steps in seconds.**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture & Pipeline](#-architecture--pipeline)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Agent Workflow](#-agent-workflow)
- [API Reference](#-api-reference)
- [Supported Regulations](#-supported-regulations)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Known Issues & Limitations](#-known-issues--limitations)
- [Roadmap](#-roadmap)

---

## 🔍 Overview

**RegPilot AI** is an AI-powered compliance copilot designed to help startups proactively detect regulatory risks and establish compliance roadmap items early in their development cycle. Startups submit their concept, select a target regulatory jurisdiction, and customize scope factors (like Generative AI integration, User Privacy features, Fintech constraints, and Healthcare requirements). 

The backend runs a multi-agent retrieval-augmented generation (RAG) loop:
1. **Compliance Agent** queries a vector database ([ChromaDB](https://github.com/chroma-core/chroma)) populated with structural regulation texts, matches them semantically to the startup idea, and issues a structured audit of policy gaps, severity levels, and compliant highlights.
2. **Action Agent** takes the matched policy gaps and compiles a concrete, prioritizable action plan detailing immediate, mid-term (30 days), and long-term (90 days) milestones.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ⚡ **Instant Compliance Audit** | Paste a startup idea to analyze regulatory conflicts across multiple frameworks in seconds |
| 🌍 **Multi-Jurisdiction Audits** | Target global, regional, or specific laws (EU, US, India, or general cross-border tech standards) |
| 🧠 **Intelligent RAG Matching** | Sentence Transformers + ChromaDB match concept details to raw regulation clauses |
| 🛡️ **Dual-Agent Architecture** | Separate agents handle legal gap categorization and operational action-step planning |
| 🚥 **Severity Classification** | Identifies issues as High, Medium, or Low severity for easier priority triage |
| 🧭 **Interactive Dial Indicators** | Real-time radar/risk indicators shift visual bounds depending on overall compliance risk rating |
| ⚙️ **Scope Settings Customization** | Toggle industry verticals (GenAI, Privacy, Fintech, Healthcare) to customize risk profile scans |
| 💻 **Simulated Scanner Terminal** | Interactive terminal output logs step-by-step compliance database handshakes and scans |
| 📑 **Actionable Remediation Roadmap** | Returns explicit tasks with deadlines ("immediate", "30 days", "90 days") |
| 🐳 **Docker-Compose Ready** | Completely containerized setup to spin up both backend and frontend in one command |

---

## 🏗️ Architecture & Pipeline

```
┌────────────────────────────────────────────────────────────────────────┐
│                          USER CLIENT BROWSER                           │
│                                                                        │
│   ┌────────────────────┐   ┌───────────────────┐  ┌─────────────────┐  │
│   │ Idea Input Area    │──▶│ Scope Toggles     │──▶│ Region Selector │  │
│   └────────────────────┘   └───────────────────┘  └─────────────────┘  │
│                                      │                                 │
│                                      ▼                                 │
│                           Next.js Client (Tailwind)                    │
│                        (Visual gauges, Tabbed Report)                  │
└──────────────────────────────────────┬─────────────────────────────────┘
                                       │
                              HTTP POST /analyze
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           FASTAPI BACKEND RUNNER                       │
│                                                                        │
│        ┌─────────────────────────────────────────────────────────┐     │
│        │ 1. Compliance Agent (agents/compliance_agent.py)        │     │
│        │    - Embeds concept query via SentenceTransformers       │     │
│        │    - Performs RAG retrieval against ChromaDB            │     │
│        │    - Hits Fireworks AI (DeepSeek-V4-Flash)              │     │
│        │    - Classifies gaps, severity, and compliant points   │     │
│        └─────────────────────────────┬───────────────────────────┘     │
│                                      │                                 │
│                                      ▼                                 │
│        ┌─────────────────────────────────────────────────────────┐     │
│        │ 2. Action Agent (agents/action_agent.py)                │     │
│        │    - Takes identified compliance gaps                   │     │
│        │    - Queries Fireworks AI to synthesize remediation    │     │
│        │    - Maps concrete action steps to structured timelines│     │
│        └─────────────────────────────┬───────────────────────────┘     │
│                                      │                                 │
│                                      ▼                                 │
│                              Aggregated JSON                           │
└──────────────────────────────────────┬─────────────────────────────────┘
                                       │
                                       ▼
                         Returned to Client Dashboard
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 + TypeScript | UI Dashboard framework with dynamic layout |
| **Styling** | Tailwind CSS + Custom Ambient Radial Glows | Modern, responsive dark-mode cyber interface |
| **Icons** | Lucide React | High-quality developer vector indicators |
| **Backend API** | FastAPI + Python 3.11 | Performant, asynchronous endpoint routing |
| **Vector DB** | ChromaDB (In-Memory client) | Local lightweight regulatory vector index |
| **Embeddings** | Sentence Transformers (`all-MiniLM-L6-v2`) | Local fast embedding generation |
| **LLM Inference** | Fireworks AI | Fast execution of DeepSeek-V4-Flash model |
| **Containerization**| Docker & Docker-Compose | Sandbox container deployment orchestrator |

---

## 📁 Project Structure

```
RegPilot AI/
├── backend/
│   ├── agents/
│   │   ├── action_agent.py        # Compiles remediation steps and execution timelines
│   │   └── compliance_agent.py    # Matches startup ideas to regulations via ChromaDB + LLM
│   ├── models/
│   │   └── schemas.py             # FastAPI Pydantic schema validation models
│   ├── regulations/               # Core reference text data indexed in ChromaDB
│   │   ├── ccpa.txt               # CCPA compliance clauses
│   │   ├── dpdp.txt               # India Digital Personal Data Protection Act clauses
│   │   ├── eu_ai_act.txt          # EU Artificial Intelligence Act guidelines
│   │   ├── gdpr.txt               # EU General Data Protection Regulation rules
│   │   └── soc2.txt               # SOC2 Security and Trust service rules
│   ├── utils/
│   │   ├── fireworks_client.py    # Helper client to call Fireworks AI DeepSeek models
│   │   └── rag.py                 # ChromaDB vector initialization & document lookup helper
│   ├── .env.example               # Template for backend environment configs
│   ├── Dockerfile                 # Multi-stage python image setup
│   ├── main.py                    # Root FastAPI app declaration with middleware routers
│   ├── requirements.txt           # Python application dependencies
│   └── test_groq.py               # Auxiliary connection verification utility
├── frontend/
│   ├── app/
│   │   ├── layout.tsx             # Root page wrappers and base HTML setups
│   │   ├── page.tsx               # Primary dashboard interface and simulated terminal logs
│   │   └── globals.css            # Dark theme CSS classes and cyberpunk grids
│   ├── public/                    # Static asset files
│   ├── .env.local.example         # Template for client api address setup
│   ├── Dockerfile                 # Next.js multi-stage build configuration
│   ├── package.json               # Node packages and configuration scripts
│   └── tsconfig.json              # TypeScript compilation rules
├── docker-compose.yml             # Orchestrates and links frontend and backend containers
└── README.md                      # Detailed project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ & **npm** v9+ (for running the frontend locally)
- **Python** 3.10+ (for running the backend locally)
- **Docker** & **Docker-Compose** (optional, for running in containers)
- A **Fireworks AI** API key → [fireworks.ai](https://fireworks.ai/)

---

### Run Locally

#### 1. Clone & Set Up Directory
```bash
git clone https://github.com/adhipatya3552/RegPilot-AI.git
cd "RegPilot AI"
```

#### 2. Start the Backend Server
Open a terminal instance:
```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```
Create a `.env` file in the `backend/` directory (see configuration below) and launch:
```bash
uvicorn main:app --reload
```
The backend API documentation is available at **http://localhost:8000/docs**.

#### 3. Start the Frontend Server
Open a second terminal instance:
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend/` directory (see configuration below) and start:
```bash
npm run dev
```
The application dashboard runs at **http://localhost:3000**.

---

### Run with Docker

To spin up the entire application stack without manual package installations, run the following command in the project root:

```bash
docker-compose up --build
```

- **Backend Endpoint**: http://localhost:8000
- **Frontend Dashboard**: http://localhost:3000

---

## 🔑 Environment Variables

### Backend Configuration (`backend/.env`)

Configure these values in the `backend/.env` file:

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `FIREWORKS_API_KEY` | ✅ Yes | API key from your Fireworks AI account dashboard | None |
| `FIREWORKS_BASE_URL` | ✅ Yes | Base API url endpoint for Fireworks API completions | `https://api.fireworks.ai/inference/v1` |
| `ALLOWED_MODELS` | ✅ Yes | Comma-separated allowed Fireworks completions models | `accounts/fireworks/models/deepseek-v4-flash` |

### Frontend Configuration (`frontend/.env.local`)

Configure these values in the `frontend/.env.local` file:

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | Target URL of the backend API router | `http://localhost:8000` |

---

## ⚙️ Agent Workflow

1. **User Input Submission**: The user enters their startup idea (e.g., *"An AI health tracker app that scans prescription images to monitor patient medications"*), toggles compliance scopes, and clicks the region target.
2. **Retrieval (RAG)**: The concept input is sent to the backend. The backend encodes the concept and queries ChromaDB for the 10 most relevant regulatory clauses associated with the target country/framework.
3. **Audit Assessment (Compliance Agent)**: The matched text clauses, user concept, and scopes are submitted to the Fireworks API using DeepSeek-V4-Flash. It assesses the concept against matched rules to highlight compliance gaps, compliant sections, and overall risks.
4. **Remediation Plan (Action Agent)**: The list of gaps compiled by the Compliance Agent is sent to the Action Agent. It outputs explicit mitigation plans with logical priority timelines.
5. **Dashboard Presentation**: The frontend renders details into tabs (Overview Dashboard, Compliance Gaps, Compliant Areas, and Action Roadmaps) with distinct severity badges and interactive indicators.

---

## 📡 API Reference

### Analyze Startup Idea
`POST /analyze`

Analyzes the compliance gaps and action plan for a startup idea in a specific region.

* **Request Body Schema**:
  ```json
  {
    "idea": "string (the startup description)",
    "region": "string (options: 'global', 'india', 'eu', 'us')"
  }
  ```

* **Sample Request**:
  ```json
  {
    "idea": "A generative AI chatbot that processes credit scores of patients to offer quick loans.",
    "region": "eu"
  }
  ```

* **Sample JSON Response**:
  ```json
  {
    "compliance_report": {
      "gaps": [
        {
          "regulation": "EU AI Act",
          "issue": "AI system assessing credit scores is classified as high-risk under safety classification standards.",
          "severity": "high"
        },
        {
          "regulation": "GDPR",
          "issue": "Processing personal data regarding financial state requires explicit user consent guidelines.",
          "severity": "medium"
        }
      ],
      "compliant_areas": [
        "User chat interface utilizes standard token encryption templates"
      ],
      "overall_risk": "high"
    },
    "action_plan": {
      "action_steps": [
        {
          "regulation": "EU AI Act",
          "action": "Ensure logging capabilities and establish risk management protocols for high-risk credit profiling systems.",
          "timeline": "immediate"
        },
        {
          "regulation": "GDPR",
          "action": "Draft clear data processing consent sheets and implement automated data deletion flows.",
          "timeline": "30 days"
        }
      ],
      "disclaimer": "This is AI-generated guidance only, not legal advice. Consult a qualified lawyer before making compliance decisions."
    }
  }
  ```

---

## ⚖️ Supported Regulations

RegPilot AI indexes reference items across:
* 🇪🇺 **GDPR (EU)**: Core rules regulating personal user data rights and strict processing parameters.
* 🇮🇳 **DPDP Act (India)**: Digital Personal Data Protection guidelines, governing data fiduciary duties.
* 🇺🇸 **CCPA (US)**: Consumer privacy act rules specifying consumer opt-outs, rights to delete, and disclosures.
* 🇪🇺 **EU AI Act**: Risk-tiered regulatory rules targeting machine learning systems, transparency, and logging.
* 🔐 **SOC 2**: Security standards testing service organization controls on security, processing, and privacy.

---

## 🧪 Testing

The backend includes a Groq testing verification script (`backend/test_groq.py`) to verify network connectivity to API environments outside the local scope.

```bash
cd backend
python test_groq.py
```
Expected Output:
```text
Groq working!
```

---

## 🌐 Deployment

### Deploy to Render (Backend)
1. Set up a Web Service on [Render](https://render.com/).
2. Select your repository and point the directory to `backend/`.
3. Select **Docker** as the environment (it will build from `backend/Dockerfile` automatically).
4. Add all environment variables (e.g. `FIREWORKS_API_KEY`) to the service configuration.

### Deploy to Vercel (Frontend)
1. Connect your repository to [Vercel](https://vercel.com/).
2. Point the build scope to the `frontend/` directory.
3. Configure target environment variables (like `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`).
4. Click **Deploy**.

---

## ⚠️ Known Issues & Limitations

| Issue | Status | Workaround |
|-------|--------|-----------|
| Local SentenceTransformer weights download is slow | Active | Download requires stable internet connection on first execution launch |
| Mock terminal logs delay actual UI presentation | Active | Terminal print simulations run in ~2.5s for detailed UX effect |
| ChromaDB instance is transient | Active | Collection rebuilds on backend restart; indices are local in-memory arrays |
| Rate-limiting of DeepSeek model on free tier | Active | Switch models in backend configs to alternative model keys if limits are hit |

---

## 🗺️ Roadmap

- [x] Initial FastAPI routing integration
- [x] Local ChromaDB vector database index for rules
- [x] Multi-region context matching (`india`, `eu`, `us`, `global`)
- [x] Double-agent loop (Compliance Audit + Action Remediation)
- [x] Tailwind client dashboard with mock scan logger terminal
- [x] Integration with Fireworks AI model endpoints
- [x] Docker-compose containerization support
- [ ] Implement persistent vector DB storage
- [ ] Add direct PDF checklist export functionality
- [ ] Support custom regulation document uploads (Drag-and-drop reference PDFs)
- [ ] Incorporate multi-user workspace access settings

---

<div align="center">

Built with ❤️ by [@adhipatya3552](https://github.com/adhipatya3552)

</div>