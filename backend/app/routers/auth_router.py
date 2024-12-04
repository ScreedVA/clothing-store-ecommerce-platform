# PyPi dependancies
from fastapi import APIRouter, HTTPException, Depends
from starlette import status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError

# Python Library
from datetime import timedelta
from typing import Annotated

# Modules 
from sessions import db_dependency
from models import SQLRefreshTokenTable
from services import authenticate_user, generate_jwt_bearer_token, decode_jwt_bearer_token, transform_to_user_model_from_post_register_user_schema
from schemas import POSTRegisterUserSchema, POSTRefreshTokenSchema, GETFullTokenSchema, GETAccessToken
from depenancies import oauth2_bearer

from pydantic import ValidationError
from schemas import TokenPayloadSchema, GETDecodedTokenPayloadSchema
from jose import jwt

SECRET_KEY = '197b2c37c391bed93fe80344fe73b806947a65e36206e05a1a23c2fa12702fe3'
ALGORITHM = 'HS256'


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=GETFullTokenSchema)
async def register_user_for_access_token(db: db_dependency,
                      request_model: POSTRegisterUserSchema):
    
    create_user_model = transform_to_user_model_from_post_register_user_schema(request_model)

    db.add(create_user_model)
    db.commit()
    db.refresh(create_user_model)

    # Generate Access token and Refresh token
    print(type(timedelta(minutes=30)))
    access_token, _ = generate_jwt_bearer_token(username=create_user_model.username, user_id=create_user_model.id, expires_delta=timedelta(minutes=30))
    refresh_token, refresh_expires = generate_jwt_bearer_token(username=create_user_model.username, user_id=create_user_model.id, expires_delta=timedelta(days=7))

    # Store Refresh token into database
    refresh_token_model: SQLRefreshTokenTable = SQLRefreshTokenTable(token=refresh_token, user_id=create_user_model.id, expires_at=refresh_expires)
    db.add(refresh_token_model)
    db.commit()

    response: GETFullTokenSchema = GETFullTokenSchema(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type='bearer'
    )

    return response
    
   
@router.post("/login")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    
    # Authenticate form data user login request
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user.')

    # Generate Access token and Refresh token
    access_token, _ = generate_jwt_bearer_token(username=user.username, user_id=user.id, expires_delta=timedelta(minutes=30))
    refresh_token, refresh_expires = generate_jwt_bearer_token(username=user.username, user_id=user.id, expires_delta=timedelta(days=7))

    # Store Refresh token into database
    refresh_token_model: SQLRefreshTokenTable = SQLRefreshTokenTable(token=refresh_token, user_id=user.id, expires_at=refresh_expires)
    db.add(refresh_token_model)
    db.commit()

    response: GETFullTokenSchema = GETFullTokenSchema(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type='bearer'
    )

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@router.post("/refresh")
async def refresh_access_token(request_body: POSTRefreshTokenSchema, db: db_dependency):

    # Decode and validate Refresh request
    try:
        payload = await decode_jwt_bearer_token(request_body.refresh_token)
        print(type(payload))
        
        # Validate if Refresh token request is stored in Database
        stored_token = db.query(SQLRefreshTokenTable).filter(SQLRefreshTokenTable.token == request_body.refresh_token).first()
        if not stored_token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        
        # Generate new Access token
        new_access_token, _ = generate_jwt_bearer_token(user_id=payload.id, username=payload.username,  expires_delta=timedelta(minutes=1))
        response: GETAccessToken = GETAccessToken(
            access_token=new_access_token,
            token_type='bearer'
        )

        return response
    
    # If Refresh token request is invalid return Error
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
