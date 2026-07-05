from utils.groq_client import call_llm
from utils.rag import query_regulations
import json, re

def check_compliance(idea: str, region: str) -> dict:
    relevant_rules = query_regulations(idea)
    rules_text = "\n".join(relevant_rules)

    prompt = f"""You are a compliance expert. A startup has this idea:
"{idea}"

Target region: {region}

Relevant regulations:
{rules_text}

Identify compliance gaps. Return ONLY valid JSON:
{{
  "gaps": [
    {{
      "regulation": "regulation name",
      "issue": "specific problem with this startup idea",
      "severity": "high or medium or low"
    }}
  ],
  "compliant_areas": ["area 1", "area 2"],
  "overall_risk": "high or medium or low"
}}"""

    result = call_llm(prompt)
    match = re.search(r'\{[\s\S]+\}', result)
    try:
        return json.loads(match.group() if match else result)
    except:
        return {"raw": result}