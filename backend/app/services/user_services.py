
# Python Libaray
from datetime import datetime

# Modules
from models import SQLUserTable
from schemas import POSTRegisterUserSchema, GETUserDetailsSchema, GETUserSummarySchema
from .auth_service import bcrypt_context

def transform_to_user_model_from_post_register_user_schema(input_model: POSTRegisterUserSchema) -> SQLUserTable:

    user_table = SQLUserTable(
	    first_name=input_model.first_name,
	    last_name=input_model.last_name,
	    username=input_model.username,
	    email=input_model.email,
	    hashed_password=bcrypt_context.hash(input_model.password),
	    date_of_birth=datetime.strptime(input_model.date_of_birth, "%Y-%m-%d")
    )    
    
    return user_table

def transform_to_read_user_schema_from_user_model(user: SQLUserTable) -> GETUserDetailsSchema:

    read_user_request = GETUserDetailsSchema(
        id=user.id,
        username=user.username.title(),
        email=user.email,
        first_name=user.first_name.title(),
        last_name=user.last_name.title(),
        date_of_birth=datetime.strftime(user.date_of_birth, "%Y-%m-%d"),
    )       
    
    return read_user_request

def transform_to_get_user_summary_schema_from_model(input_table: SQLUserTable) -> GETUserSummarySchema:

    read_user_request = GETUserSummarySchema(
        id=input_table.id,
        username=input_table.username
    )

    return read_user_request