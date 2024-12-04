# PyPi Dependancies
from sqlalchemy import Column, Integer,ForeignKey, Enum as SQLALchemyEnum
from sqlalchemy.orm import relationship

# Python Library
from datetime import datetime

# Modules
from .base_models import TimeStampModel
from enums import EnumInventoryChangeReasons

class SQLInventoryLogTable(TimeStampModel):
    # Track changes to inventory
    __tablename__ = "inventory_log"

    quantity_change = Column(Integer, nullable=False)
    reason = Column(SQLALchemyEnum(EnumInventoryChangeReasons), nullable=False)

    # Foreign Key    
    clothing_item_id = Column(Integer, ForeignKey("clothing_item.id"))

    # Relationships
    clothing_item = relationship("SQLClothingItemTable", back_populates="inventory_log_list")


