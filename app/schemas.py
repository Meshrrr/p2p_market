from pydantic import BaseModel, Field


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str = Field(ge=8, le=20)

class LoginRequest(BaseModel):
    username: str
    password: str