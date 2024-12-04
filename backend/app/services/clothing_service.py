# Pypi Dependancies
from sqlalchemy.orm import Query, Session
from sqlalchemy import and_, func

# Modules
from models import SQLClothingItemTable, SQLClothingImageTable
from schemas import GETClothingItemSummarySchema, FilterForClothingTable

def transform_to_clothing_item_summary_schema_from_model(clothing_item_table: SQLClothingItemTable, primary_clothing_image: SQLClothingImageTable) -> GETClothingItemSummarySchema:
    result: GETClothingItemSummarySchema = GETClothingItemSummarySchema(
        id=clothing_item_table.id,
        name=clothing_item_table.name,
        price=clothing_item_table.price,
        rating=clothing_item_table.rating,
        primary_img_id=primary_clothing_image.id,
        img_alt_text=primary_clothing_image.image_alt_text
    )

    return result

def generate_filter_condition_clothing_item_summary_list(clothingFilter: FilterForClothingTable, db:Session) -> Query[SQLClothingItemTable]:
    
    query = db.query(SQLClothingItemTable)

    filter_condition = []

    # print(f"Filtering by price range: min={clothingFilter.price_range.min}, max={clothingFilter.price_range.max}")
    if clothingFilter.price_range:
        filter_condition.append(SQLClothingItemTable.price >= int(clothingFilter.price_range.min),)
        filter_condition.append(SQLClothingItemTable.price <= clothingFilter.price_range.max)
        
    if clothingFilter.size_selection:
        filter_condition.append(
                func.json_extract_path_text(SQLClothingItemTable.clothing_varation_list, 'size') == clothingFilter.size_selection.value
            )

    if filter_condition:
        query = query.filter(and_(*filter_condition))

    return query
