
# Pypi dependancies
from fastapi import APIRouter, HTTPException

from starlette import status

# Python Library
from typing import List

# Module
from models import SQLUserTable
from schemas import GETUserSummarySchema
from services import user_dependency
from sessions import db_dependency


router = APIRouter(
    prefix='/admin',
    tags=['admin']
)


@router.get("/", response_model=List[GETUserSummarySchema])
async def get_user_summary_list(user: user_dependency, db: db_dependency):
    auth_user: SQLUserTable = db.query(SQLUserTable).filter(SQLUserTable.id == user.id).first()

    if not auth_user.is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User is not admin authorized")

    user_list: List[SQLUserTable] = db.query(SQLUserTable).all()

    return user_list