# Python Library
from datetime import datetime
from typing import List
 
# Module
from models import SQLUserTable, SQLClothingItemTable, SQLClothingMaterialTable, SQLClothingVariationTable, SQLClothingImageTable
from services import bcrypt_context
from enums import EnumClothingColorVariations, EnumClothingFitTypes, EnumClothingPatterns, EnumClothingSizeVarations



# User Management Tables
def add_default_users(db):

    user_table_list: List[SQLUserTable] = [
        SQLUserTable(username="alice", hashed_password=bcrypt_context.hash("123"), email="alice.doe@example.com", first_name="Alice", last_name="Doe", is_active=True, date_of_birth=datetime.strptime("1990-06-15", "%Y-%m-%d"), is_admin=True),
        SQLUserTable(username="jane_smith", hashed_password=bcrypt_context.hash("123"), email="jane.smith@example.com", first_name="Jane", last_name="Smith", is_active=False, date_of_birth=datetime.strptime("1985-11-23", "%Y-%m-%d")),
        SQLUserTable(username="charlie_brown", hashed_password=bcrypt_context.hash("123"), email="charlie.brown@example.com", first_name="Charlie", last_name="Brown", is_active=True, date_of_birth=datetime.strptime("2000-02-05", "%Y-%m-%d"))
    ]

    for user in user_table_list:
        db.add(user)
        db.commit()


# Clothing Managment Tables
def add_default_clothes(db):

    # Clothing Item Tables
    clothing_items_table_list = [
    SQLClothingItemTable(
        name="Casual Cotton T-Shirt",
        description="A soft and comfortable cotton t-shirt suitable for everyday wear.",
        rating=4,
        care_instructions="Machine wash cold with similar colors. Do not bleach.",
        fit_type=EnumClothingFitTypes.REGULAR,
        clothing_pattern=EnumClothingPatterns.SOLID,
        price=203,
        discount=0.10,
        stock_quantity=100,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Formal Silk Shirt",
        description="Elegant silk shirt for formal occasions.",
        rating=5,
        care_instructions="Dry clean only.",
        fit_type=EnumClothingFitTypes.SLIM,
        clothing_pattern=EnumClothingPatterns.STRIPED,
        price=320,
        discount=0.15,
        stock_quantity=50,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Woolen Sweater",
        description="Warm and cozy sweater made from premium wool.",
        rating=4,
        care_instructions="Hand wash only. Dry flat.",
        fit_type=EnumClothingFitTypes.OVERSIZED,
        clothing_pattern=EnumClothingPatterns.KNITTED,
        price=250,
        discount=0.20,
        stock_quantity=30,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Linen Summer Shirt",
        description="Breathable linen shirt perfect for summer.",
        rating=5,
        care_instructions="Machine wash with gentle cycle.",
        fit_type=EnumClothingFitTypes.REGULAR,
        clothing_pattern=EnumClothingPatterns.CHECKERED,
        price=50,
        discount=0.12,
        stock_quantity=80,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Velvet Party Blazer",
        description="Luxurious velvet blazer for special occasions.",
        rating=5,
        care_instructions="Dry clean only.",
        fit_type=EnumClothingFitTypes.SLIM,
        clothing_pattern=EnumClothingPatterns.SOLID,
        price=75,
        discount=0.18,
        stock_quantity=25,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Leather Jacket",
        description="Stylish leather jacket for a bold look.",
        rating=4,
        care_instructions="Wipe clean with a damp cloth.",
        fit_type=EnumClothingFitTypes.SLIM,
        clothing_pattern=EnumClothingPatterns.SOLID,
        price=90,
        discount=0.10,
        stock_quantity=40,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Denim Jeans",
        description="Classic denim jeans with a modern fit.",
        rating=4,
        care_instructions="Machine wash with cold water.",
        fit_type=EnumClothingFitTypes.REGULAR,
        clothing_pattern=EnumClothingPatterns.SOLID,
        price=45,
        discount=0.08,
        stock_quantity=120,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Cotton Polo Shirt",
        description="Lightweight cotton polo shirt for casual outings.",
        rating=5,
        care_instructions="Machine wash cold, tumble dry low.",
        fit_type=EnumClothingFitTypes.REGULAR,
        clothing_pattern=EnumClothingPatterns.STRIPED,
        price=65,
        discount=0.09,
        stock_quantity=60,
        is_active=True,
    ),
    SQLClothingItemTable(
        name="Winter Coat",
        description="Heavy-duty winter coat to keep you warm.",
        rating=5,
        care_instructions="Dry clean only.",
        fit_type=EnumClothingFitTypes.OVERSIZED,
        clothing_pattern=EnumClothingPatterns.SOLID,
        price=150,
        discount=0.25,
        stock_quantity=15,
        is_active=True,
    ),
    ]

    for clothing_item_table in clothing_items_table_list:
        db.add(clothing_item_table)
        db.commit()
        db.refresh(clothing_item_table)

    # Clothing Material Tables
    clothing_material_list = [
    SQLClothingMaterialTable(clothing_item_id=i, cotton=values[0], linen=values[1], silk=values[2], wool=values[3], velvet=values[4], leather=values[5])
    for i, values in enumerate([
        (90.00, 0.00, 0.00, 0.00, 0.00, 0.00),
        (0.00, 0.00, 100.00, 0.00, 0.00, 0.00),
        (0.00, 0.00, 0.00, 80.00, 20.00, 0.00),
        (0.00, 100.00, 0.00, 0.00, 0.00, 0.00),
        (0.00, 0.00, 0.00, 0.00, 100.00, 0.00),
        (0.00, 0.00, 0.00, 0.00, 0.00, 100.00),
        (100.00, 0.00, 0.00, 0.00, 0.00, 0.00),
        (100.00, 0.00, 0.00, 0.00, 0.00, 0.00),
        (0.00, 0.00, 0.00, 60.00, 0.00, 40.00),
    ], start=1)
]

    for clothing_material in clothing_material_list:
        db.add(clothing_material)
        db.commit()
        db.refresh(clothing_material)

    # Clothing Variation Tables
    clothing_variation_list = []
    for item_id in range(1, 10):
        clothing_variation_list.extend([
            SQLClothingVariationTable(clothing_item_id=item_id, size=EnumClothingSizeVarations.SMALL, color=EnumClothingColorVariations.RED, sku=f"ITEM{item_id}-S-R", stock_quantity=clothing_items_table_list[item_id - 1].stock_quantity * 0.2),
            SQLClothingVariationTable(clothing_item_id=item_id, size=EnumClothingSizeVarations.MEDIUM, color=EnumClothingColorVariations.BLUE, sku=f"ITEM{item_id}-M-B", stock_quantity=clothing_items_table_list[item_id - 1].stock_quantity * 0.5),
            SQLClothingVariationTable(clothing_item_id=item_id, size=EnumClothingSizeVarations.LARGE, color=EnumClothingColorVariations.BLACK, sku=f"ITEM{item_id}-L-BK", stock_quantity=clothing_items_table_list[item_id - 1].stock_quantity * 0.3),
        ])

    for clothing_variation in clothing_variation_list:
        db.add(clothing_variation)
        db.commit()
        db.refresh(clothing_variation)
    
    # Clothing Image Tables
    clothing_image_list = []
    for item_id in range(1, 10):
        clothing_image_list.extend([
            SQLClothingImageTable(clothing_item_id=item_id, image_path=f"item_{item_id}_1.png", image_alt_text=f"item_{item_id}_1.png", primary_image_flag=True),
            # SQLClothingImageTable(clothing_item_id=item_id, image_path=f"item_{item_id}_2.png", image_alt_text=f"item_{item_id}_2.png", primary_image_flag=False),
            # SQLClothingImageTable(clothing_item_id=item_id, image_path=f"item_{item_id}_3.png", image_alt_text=f"item_{item_id}_3.png", primary_image_flag=False),
        ])

    for clothing_image in clothing_image_list:
        db.add(clothing_image)
        db.commit()
        db.refresh(clothing_image)
