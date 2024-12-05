# Pypi dependencies
from fastapi import Query
from pydantic import BaseModel

# Python Library
from typing import Optional

# Module
from enums import EnumClothingColorVariations, EnumClothingSizeVarations

class FilterBaseModel(BaseModel):
    page: Optional[int] = Query(default=1, ge=1)
    page_size: Optional[int] = Query(default=10, ge=1, le=100)

class FilterForClothingTable(FilterBaseModel):
    min_price: Optional[int] = Query(default=None)
    max_price: Optional[int] = Query(default=None)
    size_selection: Optional[EnumClothingSizeVarations] = Query(default=None)
    color_selection: Optional[EnumClothingColorVariations] = Query(default=None)
