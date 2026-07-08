from utils.fireworks_client import call_llm
import json, re

def generate_actions(gaps: list) -> dict:
    gaps_text = "\n".join([f"- {g.get('regulation')}: {g.get('issue')}" for g in gaps])

    prompt = f"""You are a compliance consultant. For each gap below, give a concrete fix.
Return ONLY valid JSON:
{{
  "action_steps": [
    {{
      "regulation": "regulation name",
      "action": "specific thing to do",
      "timeline": "immediate or 30 days or 90 days"
    }}
  ],
  "disclaimer": "This is AI-generated guidance only, not legal advice. Consult a qualified lawyer before making compliance decisions."
}}

Gaps:
{gaps_text}"""

    result = call_llm(prompt, json_mode=True)
    match = re.search(r'\{[\s\S]+\}', result)
    try:
        return json.loads(match.group() if match else result)
    except:
        return {"raw": result}