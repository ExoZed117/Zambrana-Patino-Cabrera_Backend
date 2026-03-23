from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import Optional, List

# --- ESQUEMAS PARA GRUPOS ---
class GrupoBase(BaseModel):
    nombre_grupo: str
    esta_activo: bool = True

class GrupoCreate(GrupoBase):
    pass

class GrupoResponse(GrupoBase):
    id: UUID
    class Config:
        from_attributes = True

# --- ESQUEMAS PARA PERSONAS ---
class PersonaBase(BaseModel):
    nombres: str
    apellidos: str
    correo: Optional[EmailStr] = None
    nro_celular: Optional[str] = None
    direccion: Optional[str] = None
    observaciones: Optional[str] = None
    fotografia: Optional[str] = None
    esta_activo: bool = True
    grupo_id: UUID

class PersonaCreate(PersonaBase):
    pass

# Esquema para editar (todo es opcional para que pueda editar solo un campo si quiere)
class PersonaUpdate(BaseModel):
    nombres: Optional[str] = None
    apellidos: Optional[str] = None
    correo: Optional[EmailStr] = None
    nro_celular: Optional[str] = None
    direccion: Optional[str] = None
    observaciones: Optional[str] = None
    fotografia: Optional[str] = None
    esta_activo: Optional[bool] = None
    grupo_id: Optional[UUID] = None

class PersonaResponse(PersonaBase):
    id: UUID
    class Config:
        from_attributes = True