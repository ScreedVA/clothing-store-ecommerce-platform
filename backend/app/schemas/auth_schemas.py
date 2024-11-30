from typing import Optional
from pydantic import BaseModel, Field
from datetime import timedelta

class TokenPayloadSchema(BaseModel):
    id: int
    sub: str
    exp_date: str

class GETDecodedTokenPayloadSchema(BaseModel):
    id: int
    username: str


class TokenBaseSchema(BaseModel):
    token_type: str = Field(alias="tokenType")

    class Config:
        populate_by_name = True

class GETAccessToken(TokenBaseSchema):
    access_token: str = Field(alias="accessToken")

class POSTRefreshTokenSchema(TokenBaseSchema): 
    refresh_token: str = Field(alias="refreshToken")

class GETFullTokenSchema(GETAccessToken, POSTRefreshTokenSchema):
    pass
