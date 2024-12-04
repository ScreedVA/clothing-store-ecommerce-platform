# Pypi Dependencies
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError
from passlib.context import CryptContext
from starlette import status
from jose import jwt, JWTError

# Python Libraries
from datetime import datetime, timedelta, timezone
from typing import Annotated

# Modules
from sessions import db_dependency
from models import SQLUserTable, SQLRefreshTokenTable
from schemas import TokenPayloadSchema, GETDecodedTokenPayloadSchema
from depenancies import oauth2_bearer


SECRET_KEY = '197b2c37c391bed93fe80344fe73b806947a65e36206e05a1a23c2fa12702fe3'
ALGORITHM = 'HS256'


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def cleanup_expired_tokens(db: db_dependency):
    # Delete expired tokens from database
    db.query(SQLRefreshTokenTable).filter(SQLRefreshTokenTable.expires_at < datetime.now(timezone.utc)).delete()
    db.commit()

def authenticate_user(username: str, password: str, db):
    # Helper function to authenticate login request
    
    user: SQLUserTable = db.query(SQLUserTable).filter(SQLUserTable.username == username).first()
    if not user or not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def generate_jwt_bearer_token(username: str, user_id: int,  expires_delta: timedelta) -> str:
    
    # Helper function to create tokens Refresh/Access
    # Encodes TokenPayloadSchema -> jwtToken
    expires: timedelta = datetime.now(timezone.utc) + expires_delta
    encode: TokenPayloadSchema = TokenPayloadSchema(
        id=user_id,
        sub=username,
        exp_date=datetime.strftime(expires, "%Y-%m-%d")
    )

    token = jwt.encode(encode.dict(), SECRET_KEY, algorithm=ALGORITHM)

    return token, expires


async def decode_jwt_bearer_token(token: Annotated[str, Depends(oauth2_bearer)]) -> GETDecodedTokenPayloadSchema:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # Validate payload
        if not payload.get("id") or not payload.get("sub"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )

        # Return the decoded payload as a schema
        return GETDecodedTokenPayloadSchema(
            id=payload["id"],
            username=payload["sub"]
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    # except ValidationError as e:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail=f"Token validation failed: {e.errors()}"
    #     )


user_dependency = Annotated[GETDecodedTokenPayloadSchema, Depends(decode_jwt_bearer_token)]
