# Pypi dependencies
from fastapi import Query
from pydantic import BaseModel

# Python Library
from typing import Optional

# Module


class FilterBaseModel(BaseModel):
    page: Optional[int] = Query(default=1, ge=1)
    page_size: Optional[int] = Query(default=6, ge=1, le=100)


class FilterResponsePageConfig(BaseModel):
    total_pages: int 
    total_items: int
    items_per_page: int