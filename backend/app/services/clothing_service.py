# Pypi Dependancies
from sqlalchemy.orm import Query, Session
from sqlalchemy import and_, func

# Python Library
from typing import List

# Modules
from models import SQLClothingItemTable, SQLClothingImageTable, SQLClothingVariationTable
from schemas import GETClothingItemSummarySchema, GETClothingItemDetailsSchema, FilterForClothingTable
from enums import EnumClothingColorVariations, EnumClothingSizeVarations

def transform_to_clothing_item_summary_schema_from_model(clothing_item_table: SQLClothingItemTable, primary_clothing_image: SQLClothingImageTable = None) -> GETClothingItemSummarySchema:
    
    image_id = primary_clothing_image.id if primary_clothing_image else None
    image_alt_text = primary_clothing_image.image_alt_text if primary_clothing_image else None

    result: GETClothingItemSummarySchema = GETClothingItemSummarySchema(
        id=clothing_item_table.id,
        name=clothing_item_table.name,
        price=clothing_item_table.price,
        rating=clothing_item_table.rating,
        primary_img_id=image_id,
        img_alt_text=image_alt_text
    )

    return result

def transform_to_clothing_item_details_schema_from_model(clothing_item_table: SQLClothingItemTable):
    
    clothing_variations_size_list: List[EnumClothingSizeVarations] = [clothing_variation.size for clothing_variation in clothing_item_table.clothing_varation_list]
    clothing_variations_color_list: List[EnumClothingColorVariations] = [clothing_variation.color for clothing_variation in clothing_item_table.clothing_varation_list]

    clothing_item_schema: GETClothingItemDetailsSchema = GETClothingItemDetailsSchema(
        name=clothing_item_table.name,
        id=clothing_item_table.id,
        price=clothing_item_table.price,
        description=clothing_item_table.description,
        rating=clothing_item_table.rating,
        color_variations=clothing_variations_color_list,
        size_variations=clothing_variations_size_list
    )

    return clothing_item_schema

def generate_filter_condition_clothing_item_summary_list(clothingFilter: FilterForClothingTable, db:Session) -> Query[SQLClothingItemTable]:
    
    query = db.query(SQLClothingItemTable)
    if clothingFilter.size_selection or clothingFilter.color_selection:
        query = query.join(SQLClothingVariationTable)

    filter_condition = []

    if clothingFilter.size_selection:
        filter_condition.append(SQLClothingVariationTable.size == clothingFilter.size_selection)

    if clothingFilter.size_selection:
        filter_condition.append(SQLClothingVariationTable.color == clothingFilter.color_selection)

    if clothingFilter.min_price:
        filter_condition.append(SQLClothingItemTable.price >= clothingFilter.min_price)
        
    if clothingFilter.max_price:
        filter_condition.append(SQLClothingItemTable.price <= clothingFilter.max_price)

    if filter_condition:
        query = query.filter(and_(*filter_condition))

    return query
