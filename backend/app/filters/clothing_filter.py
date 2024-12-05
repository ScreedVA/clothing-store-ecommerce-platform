# Pypi dependencies
from fastapi import Query
from pydantic import BaseModel

# Python Library
from typing import Optional

# Module
from enums import EnumClothingColorVariations, EnumClothingSizeVarations
from .base_filter import FilterBaseModel

class FilterRequestClothingTable(FilterBaseModel):
    min_price: Optional[int] = Query(default=None)
    max_price: Optional[int] = Query(default=None)
    size_selection: Optional[EnumClothingSizeVarations] = Query(default=None)
    color_selection: Optional[EnumClothingColorVariations] = Query(default=None)
