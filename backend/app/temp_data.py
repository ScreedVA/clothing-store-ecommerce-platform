# Python Library
from datetime import datetime
from typing import List
 
# Module
from models import SQLUserTable
from services import bcrypt_context




def add_default_data(db):

    user_table_list: List[SQLUserTable] = [
        SQLUserTable(username="alice", hashed_password=bcrypt_context.hash("123"), email="alice.doe@example.com", first_name="Alice", last_name="Doe", is_active=True, date_of_birth=datetime.strptime("1990-06-15", "%Y-%m-%d"), is_admin=True),
        SQLUserTable(username="jane_smith", hashed_password=bcrypt_context.hash("123"), email="jane.smith@example.com", first_name="Jane", last_name="Smith", is_active=False, date_of_birth=datetime.strptime("1985-11-23", "%Y-%m-%d")),
        SQLUserTable(username="charlie_brown", hashed_password=bcrypt_context.hash("123"), email="charlie.brown@example.com", first_name="Charlie", last_name="Brown", is_active=True, date_of_birth=datetime.strptime("2000-02-05", "%Y-%m-%d"))
    ]

    for user in user_table_list:
        db.add(user)
        db.commit()