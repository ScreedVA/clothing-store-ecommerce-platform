# Pypi dependancies
from fastapi import APIRouter, HTTPException

from starlette import status

# Python Library
from typing import List

# Module
from services import user_dependency
from sessions import db_dependency


router = APIRouter(
    prefix='/product/clothing',
    tags=['clothing']
)



