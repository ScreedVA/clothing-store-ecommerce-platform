# Pypi dependancies
from fastapi import APIRouter, HTTPException, Depends, Request, Query
from starlette import status
from sqlalchemy import and_, desc

# Python Library
from typing import List
import json
from math import ceil

# Module
from models import SQLClothingItemTable, SQLClothingImageTable
from schemas import GETClothingItemSummarySchema, GETClothingItemDetailsSchema
from services import transform_to_clothing_item_summary_schema_from_model, generate_filter_condition_clothing_item_summary_list, transform_to_clothing_item_details_schema_from_model
from sessions import db_dependency
from filters import FilterRequestClothingTable, FilterResponsePageConfig

router = APIRouter(
    prefix='/product/clothing',
    tags=['clothing']
)

@router.get("/list", response_model=List[GETClothingItemSummarySchema])
async def get_clothing_item_summary_list(db: db_dependency, clothing_filter: FilterRequestClothingTable = Depends()):
    
    # Handle Pagination
    offset = (clothing_filter.page - 1) * clothing_filter.page_size

    # Get Clothing Item List
    filtered_query = generate_filter_condition_clothing_item_summary_list(clothing_filter, db)
    print(filtered_query.all())
    clothing_item_list: List[SQLClothingItemTable] = filtered_query.offset(offset).limit(clothing_filter.page_size).all()

    # transform tables to -> List[GetClothingItemSummarySchema]
    clothing_item_summary_list: List[GETClothingItemSummarySchema] = []
    for clothing_item in clothing_item_list:

        primary_clothing_image = db.query(SQLClothingImageTable).filter(and_(
            SQLClothingImageTable.clothing_item_id == clothing_item.id,
            SQLClothingImageTable.primary_image_flag == True
        )).first()

        if not primary_clothing_image:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image file is not found")
        
        # Transform SQLTable -> pydandtic schema
        clothing_item_summary_schema: GETClothingItemSummarySchema = transform_to_clothing_item_summary_schema_from_model(clothing_item_table=clothing_item, primary_clothing_image=primary_clothing_image)
        clothing_item_summary_list.append(clothing_item_summary_schema)

    return clothing_item_summary_list
    
@router.get("/details/{item_id}", response_model=GETClothingItemDetailsSchema)
async def get_clothing_item_details(db: db_dependency, item_id: int):

    # Query Table
    clothing_item_model: SQLClothingItemTable = db.query(SQLClothingItemTable).filter(SQLClothingItemTable.id == item_id).first()

    # Validate Clothing Item Table
    if not clothing_item_model:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Model not found")

    # tranform Clothing Table -> Clothing Schema
    clothing_item_details_response: GETClothingItemDetailsSchema = transform_to_clothing_item_details_schema_from_model(clothing_item_model)
    
    return clothing_item_details_response

@router.get("/price/max", response_model=GETClothingItemSummarySchema)
async def get_clothing_item_with_highest_price(db: db_dependency):

    highest_price_item: SQLClothingItemTable = db.query(SQLClothingItemTable).order_by(desc(SQLClothingItemTable.price)).first()
    highest_price_item_response: GETClothingItemSummarySchema = transform_to_clothing_item_summary_schema_from_model(highest_price_item)

    return highest_price_item_response


@router.get("/total_pages")
async def get_total_pages(
    db: db_dependency, 
    clothing_filter: FilterRequestClothingTable = Depends(), 
):
    """
    Returns the total number of pages for a given filter and items per page.
    """
    if clothing_filter.page_size <= 0:
        raise HTTPException(status_code=400, detail="Items per page must be greater than 0")

    # Generate filtered query
    filtered_query = generate_filter_condition_clothing_item_summary_list(clothing_filter, db)
    
    # Get total count of items matching the filter
    total_items = filtered_query.count()

    # Calculate total pages (ceil to round up)
    total_pages = ceil(total_items / clothing_filter.page_size)
    print(total_pages)
    response: FilterResponsePageConfig = FilterResponsePageConfig(
        total_pages=total_pages,
        total_items=total_items,
        items_per_page=clothing_filter.page_size
    )
    
    return response





@router.get("/all/images")
async def temp_get_all_images(db: db_dependency):
    print("test")
    return db.query(SQLClothingImageTable).all()



