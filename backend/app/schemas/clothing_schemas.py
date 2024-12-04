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
    img_alt_text: str = Field(alias="imgAltText")
    rating: int

    class Config:
        populate_by_name = True

class GETClothingItemSummarySchema(BaseClothingSchema):
    primary_img_id: int = Field(None, alias="primaryImgId")
    

class GETClothingItemDetailsSchema(BaseClothingSchema):
    description: str = Field(alias="description")
    color_variations: List[EnumClothingColorVariations] = Field(alias="colorVariations")
    size_variations: List[EnumClothingSizeVarations] = Field(alias="sizeVariations")

# Filters
class FilterFieldPriceSlider(BaseModel):
    min: int
    max: int

class FilterForClothingTable(BaseModel):
    price_range: Optional[FilterFieldPriceSlider] = Field(None)
    size_selection: Optional[EnumClothingSizeVarations] = Field(None)

