# Pypi dependancies
from fastapi import APIRouter, HTTPException, Depends, Request
from starlette import status
from sqlalchemy import and_, desc

# Python Library
from typing import List
import json

# Module
from models import SQLClothingItemTable, SQLClothingImageTable
from schemas import GETClothingItemSummarySchema, FilterForClothingTable, GETClothingItemDetailsSchema
from services import transform_to_clothing_item_summary_schema_from_model, generate_filter_condition_clothing_item_summary_list, transform_to_clothing_item_details_schema_from_model
from sessions import db_dependency
from enums import EnumClothingSizeVarations, EnumClothingColorVariations

router = APIRouter(
    prefix='/product/clothing',
    tags=['clothing']
)

@router.get("/list", response_model=List[GETClothingItemSummarySchema])
async def get_clothing_item_summary_list(db: db_dependency, clothing_filter: FilterForClothingTable = Depends()):
    
    # Get Clothing Item List
    filtered_query = generate_filter_condition_clothing_item_summary_list(clothing_filter, db)
    clothing_item_list: List[SQLClothingItemTable] = filtered_query.all()

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

@router.get("/all/images")
async def temp_get_all_images(db: db_dependency):
    print("test")
    return db.query(SQLClothingImageTable).all()



