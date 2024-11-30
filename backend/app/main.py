# PyPi dependancies
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
from typing import Annotated

# Python Library
from datetime import datetime

# Modules
from routers import auth_router, admin_router
from sessions import engine, Base, SessionLocal
from temp_data import add_default_data

app = FastAPI()

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],     
)

Base.metadata.create_all(bind=engine) 

app.include_router(auth_router.router)
app.include_router(admin_router.router)




def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.on_event("startup")
def startup_event():
    db = SessionLocal()  
    try:
        add_default_data(db)  
    finally:
        db.close()  

