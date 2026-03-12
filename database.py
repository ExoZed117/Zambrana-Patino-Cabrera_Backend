# database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL configurada con el Session Pooler y tu contraseña
# Nota: El usuario de Supabase para el pooler suele incluir el ID del proyecto
SQLALCHEMY_DATABASE_URL = "postgresql://postgres.svrmvpzfsakrdwcftfkw:Lacobaya117@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()