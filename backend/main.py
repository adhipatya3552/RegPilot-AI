from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import StartupInput
from agents.compliance_agent import check_compliance
from agents.action_agent import generate_actions

app = FastAPI(title="RegPilot AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "RegPilot AI running ✅"}

@app.post("/analyze")
def analyze(input: StartupInput):
    compliance = check_compliance(input.idea, input.region)
    gaps = compliance.get("gaps", [])
    actions = generate_actions(gaps)
    
    return {
        "compliance_report": compliance,
        "action_plan": actions
    }