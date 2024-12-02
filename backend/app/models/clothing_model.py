# Pypi Dependancies
from sqlalchemy import Column, String, Text, Integer, CheckConstraint, Numeric, Enum as SQLAlchemyEnum, ForeignKey
from sqlalchemy.orm import relationship

# Python Library

# Modules
from .base_models import TimeStampModel, BaseEntity
from enums import EnumClothingFitTypes

class SQLClothingItemTable(TimeStampModel):
    __tablename__ = "clothing_item"

    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=False)
    rating = Column(Integer, nullable=False)
    care_instructions = Column(Text)
    fit_type = Column(SQLAlchemyEnum(EnumClothingFitTypes), nullable=False)
    discount = Column(Numeric(3, 2), default=0)
   
    clothing_material = relationship("SQLClothingMaterialTable", back_populates="clothing_item", uselist=False, cascade="all, all-delete-orphan")
    
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

    clothing_item_id = Column(Integer, ForeignKey("user.id"))
    clothing_item = relationship("SQLClothingItemTable", back_populates="clothing_material")






