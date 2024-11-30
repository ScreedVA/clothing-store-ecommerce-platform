from .base_models import BaseEntity
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship

class SQLRefreshTokenTable(BaseEntity): 
    __tablename__ = 'refresh_token'
    
    token = Column(String, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    expires_at = Column(DateTime, nullable=False)

    user = relationship('SQLUserTable', back_populates='refresh_token')