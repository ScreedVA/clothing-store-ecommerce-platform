from pydantic import BaseModel, Field
from typing import Optional


class UserBaseSchema(BaseModel):
    username: str
    email: str
    first_name: str = Field(alias="firstName")
    last_name: str = Field(alias="lastName")
    date_of_birth: str = Field(alias="dateOfBirth")

    class Config:
        populate_by_name = True

class GETUserSummarySchema(BaseModel):
    id: int
    username: str

class GETUserDetailsSchema(UserBaseSchema):
    id: int
    pass

class POSTRegisterUserSchema(UserBaseSchema):
    password: str
    pass

class PUTUpdateUserDetailsSchema(UserBaseSchema):
    pass

