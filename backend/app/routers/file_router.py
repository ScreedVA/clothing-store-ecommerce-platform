
# Pypi dependancies
from fastapi import HTTPException, APIRouter
from fastapi.responses import FileResponse
from starlette import status

# Python Library
import os

# Module
from sessions import db_dependency
from models import SQLClothingImageTable


router = APIRouter(
    prefix='/file',
    tags=['file']
)


@router.get("/image/{item_id}", status_code=status.HTTP_200_OK)
async def serve_image(item_id: int, db: db_dependency):

    primary_clothing_image = db.query(SQLClothingImageTable).filter(SQLClothingImageTable.id == item_id).first()

    if not primary_clothing_image:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    
    # Resolve Image Directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(current_dir) # Go up one directory
    image_path = os.path.join("assets", "images")
    full_image_path = os.path.join(root_dir, image_path)

    image_dir = os.path.join(full_image_path, primary_clothing_image.image_path)

    # Target selected Image
    return FileResponse(image_dir)
