# Pypi Dependancies
from sqlalchemy import Column, String, Text, Integer, CheckConstraint, Numeric, Enum as SQLAlchemyEnum, ForeignKey, Boolean
from sqlalchemy.orm import relationship

# Python Library

# Modules
from .base_models import TimeStampModel, BaseEntity
from enums import EnumClothingFitTypes, EnumClothingPatterns, EnumClothingSizeVarations, EnumClothingColorVariations

class SQLClothingItemTable(TimeStampModel):
    __tablename__ = "clothing_item"

    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=False)
    rating = Column(Numeric(2, 1), nullable=False)
    care_instructions = Column(Text)
    fit_type = Column(SQLAlchemyEnum(EnumClothingFitTypes), nullable=False)
    clothing_pattern = Column(SQLAlchemyEnum(EnumClothingPatterns), nullable=False)
    price = Column(Numeric(3, 2), default=0)
    discount = Column(Numeric(3, 2), default=0)
    stock_quantity = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    clothing_material = relationship("SQLClothingMaterialTable", back_populates="clothing_item", uselist=False)
    clothing_varation_list = relationship("SQLClothingVariationTable", back_populates="clothing_item")
    clothing_image_list = relationship("SQLClothingImageTable", back_populates="clothing_item")
    inventory_log_list = relationship("SQLInventoryLogTable", back_populates="clothing_item")
    
    # Adding a Check Constraint for the rating column
    __table_args__ = (
        CheckConstraint('rating <= 5', name='check_rating_max_5'),
    )

class SQLClothingMaterialTable(BaseEntity):
    __tablename__ = "clothing_material"

    cotton = Column(Numeric(3, 2), default=0)
    linen = Column(Numeric(3, 2), default=0)
    silk = Column(Numeric(3, 2), default=0)
    wool = Column(Numeric(3, 2), default=0)
    velvet = Column(Numeric(3, 2), default=0)
    leather = Column(Numeric(3, 2), default=0)

    # Foreign Keys
    clothing_item_id = Column(Integer, ForeignKey("clothing_item.id"))

    # Relationships
    clothing_item = relationship("SQLClothingItemTable", back_populates="clothing_material")

class SQLClothingVariationTable(BaseEntity):
    __tablename__ = "clothing_varation"

    size = Column(SQLAlchemyEnum(EnumClothingSizeVarations), nullable=False)
    color = Column(SQLAlchemyEnum(EnumClothingColorVariations), nullable=False)
    sku = Column(String(100))
    stock_quantity = Column(Integer, nullable=False)

    # Foreign Keys
    clothing_item_id = Column(Integer, ForeignKey("clothing_item.id"))

    # Relationships
    clothing_item = relationship("SQLClothingItemTable", back_populates="clothing_varation_list")

class SQLClothingImageTable(TimeStampModel):
    __tablename__ = "clothing_image"

    image_path = Column(String(255))
    image_alt_text = Column(String(255))
    primary_image_flag = Column(Boolean, default=False)

    # Foreign Keys
    clothing_item_id = Column(Integer, ForeignKey("clothing_item.id"))

    # Relationships 
    clothing_item = relationship("SQLClothingItemTable", back_populates="clothing_image_list")
    








