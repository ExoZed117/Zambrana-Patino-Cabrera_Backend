from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import backend.models as models, backend.schemas as schemas
from backend.database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from uuid import UUID
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# ENDPOINTS GRUPOS
# -----------------------------
@app.post("/grupos/", response_model=schemas.GrupoResponse)
def crear_grupo(grupo: schemas.GrupoCreate, db: Session = Depends(get_db)):
    db_grupo = models.Grupo(**grupo.dict())
    db.add(db_grupo)
    db.commit()
    db.refresh(db_grupo)
    return db_grupo

@app.get("/grupos/", response_model=List[schemas.GrupoResponse])
def listar_grupos(db: Session = Depends(get_db)):
    return db.query(models.Grupo).all()

@app.put("/grupos/{grupo_id}", response_model=schemas.GrupoResponse)
def editar_grupo(grupo_id: UUID, grupo_update: schemas.GrupoCreate, db: Session = Depends(get_db)):
    db_grupo = db.query(models.Grupo).filter(models.Grupo.id == grupo_id).first()
    if not db_grupo:
        raise HTTPException(status_code=404, detail="Grupo no encontrado")

    update_data = grupo_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_grupo, key, value)

    db.commit()
    db.refresh(db_grupo)
    return db_grupo

# -----------------------------
# ENDPOINTS PERSONAS
# -----------------------------
@app.post("/personas/", response_model=schemas.PersonaResponse)
def crear_persona(persona: schemas.PersonaCreate, db: Session = Depends(get_db)):
    db_persona = models.Persona(**persona.dict())
    db.add(db_persona)
    db.commit()
    db.refresh(db_persona)
    return db_persona

@app.get("/personas/", response_model=List[schemas.PersonaResponse])
def listar_personas(db: Session = Depends(get_db)):
    return db.query(models.Persona).all()

@app.put("/personas/{persona_id}", response_model=schemas.PersonaResponse)
def editar_persona(persona_id: UUID, persona_update: schemas.PersonaUpdate, db: Session = Depends(get_db)):
    db_persona = db.query(models.Persona).filter(models.Persona.id == persona_id).first()
    if not db_persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    update_data = persona_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_persona, key, value)

    db.commit()
    db.refresh(db_persona)
    return db_persona