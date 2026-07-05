from pydantic import BaseModel

class StartupInput(BaseModel):
    idea: str
    region: str = "global"  # "india", "eu", "us", "global"