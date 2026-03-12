import uuid
from sqlalchemy import Column, String, Boolean, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

class Grupo(Base):
    __tablename__ = "grupos"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre_grupo = Column(String, nullable=False)
    esta_activo = Column(Boolean, default=True)
    personas = relationship("Persona", back_populates="grupo")

class Persona(Base):
    __tablename__ = "personas"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombres = Column(String, nullable=False)
    apellidos = Column(String, nullable=False)
    correo = Column(String)
    nro_celular = Column(String)
    direccion = Column(String)
    observaciones = Column(Text)
    fotografia = Column(String) # Guardaremos la URL de la imagen
    esta_activo = Column(Boolean, default=True)
    
    grupo_id = Column(UUID(as_uuid=True), ForeignKey("grupos.id"))
    grupo = relationship("Grupo", back_populates="personas")