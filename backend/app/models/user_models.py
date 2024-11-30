from .base_models import TimeStampModel
from sqlalchemy import Column, String, Boolean, Date
from sqlalchemy.orm import relationship
from datetime import datetime
from schemas import PUTUpdateUserDetailsSchema

class SQLUserTable(TimeStampModel):
    __tablename__ = "user"

    username = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    date_of_birth = Column(Date, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)

    refresh_token = relationship('SQLRefreshTokenTable', back_populates='user')

    def update_from_request(self, request: PUTUpdateUserDetailsSchema):
        self.username = request.username
        self.biography = request.biography
        self.first_name = request.first_name
        self.last_name = request.last_name
        self.date_of_birth = datetime.strptime(request.date_of_birth, "%Y-%m-%d")
        self.email = request.email