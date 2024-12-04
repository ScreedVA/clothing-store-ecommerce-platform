# Pypi Dependancies
from fastapi import Query
from pydantic import BaseModel, Field
# Python Library
from typing import Optional, List

# Modules
from enums import EnumClothingColorVariations, EnumClothingSizeVarations


class BaseClothingSchema(BaseModel):
    id: int
    name: str = Field(alias="name")
    price: int = Field(alias="price")
    rating: int

    class Config:
        populate_by_name = True

class GETClothingItemSummarySchema(BaseClothingSchema):
    img_alt_text: Optional[str] = Field(alias="imgAltText")
    primary_img_id: Optional[int] = Field(None, alias="primaryImgId")
    

class GETClothingItemDetailsSchema(BaseClothingSchema):
    description: str = Field(alias="description")
    color_variations: List[EnumClothingColorVariations] = Field(alias="colorVariations")
    size_variations: List[EnumClothingSizeVarations] = Field(alias="sizeVariations")

# Filters
class FilterForClothingTable(BaseModel):
    min_price: Optional[int] = Query(None)
    max_price: Optional[int] = Query(None)
    size_selection: Optional[EnumClothingSizeVarations] = Query(None)
    color_selection: Optional[EnumClothingColorVariations] = Query(None)


