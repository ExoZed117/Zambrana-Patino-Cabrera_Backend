import { useEffect, useState } from "react";
import "./index.css";

const API_URL = "https://contactos-backend-m759.onrender.com";

function App() {
  const [activeTab, setActiveTab] = useState("personas");

  const [grupos, setGrupos] = useState([]);
  const [personas, setPersonas] = useState([]);

  const [grupoForm, setGrupoForm] = useState({
    id: "",
    nombre_grupo: "",
    esta_activo: true,
  });

  const [personaForm, setPersonaForm] = useState({
    id: "",
    nombres: "",
    apellidos: "",
    correo: "",
    nro_celular: "",
    direccion: "",
    observaciones: "",
    fotografia: "",
    esta_activo: true,
    grupo_id: "",
  });

  useEffect(() => {
    cargarGrupos();
    cargarPersonas();
  }, []);

  async function cargarGrupos() {
    try {
      const res = await fetch(`${API_URL}/grupos/`);
      const data = await res.json();
      setGrupos(data);

      if (data.length > 0 && !personaForm.grupo_id) {
        setPersonaForm((prev) => ({ ...prev, grupo_id: data[0].id }));
      }
    } catch (error) {
      console.error("Error cargando grupos:", error);
    }
  }

  async function cargarPersonas() {
    try {
      const res = await fetch(`${API_URL}/personas/`);
      const data = await res.json();
      setPersonas(data);
    } catch (error) {
      console.error("Error cargando personas:", error);
    }
  }

  function resetGrupoForm() {
    setGrupoForm({
      id: "",
      nombre_grupo: "",
      esta_activo: true,
    });
  }

  function resetPersonaForm() {
    setPersonaForm({
      id: "",
      nombres: "",
      apellidos: "",
      correo: "",
      nro_celular: "",
      direccion: "",
      observaciones: "",
      fotografia: "",
      esta_activo: true,
      grupo_id: grupos.length > 0 ? grupos[0].id : "",
    });
  }

  async function handleGrupoSubmit(e) {
    e.preventDefault();

    const payload = {
      nombre_grupo: grupoForm.nombre_grupo,
      esta_activo: grupoForm.esta_activo,
    };

    try {
      const url = grupoForm.id
        ? `${API_URL}/grupos/${grupoForm.id}`
        : `${API_URL}/grupos/`;

      const method = grupoForm.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("No se pudo guardar el grupo");

      await cargarGrupos();
      resetGrupoForm();
    } catch (error) {
      console.error(error);
      alert("Error al guardar grupo");
    }
  }

  async function handlePersonaSubmit(e) {
    e.preventDefault();

    const payload = {
      nombres: personaForm.nombres,
      apellidos: personaForm.apellidos,
      correo: personaForm.correo || null,
      nro_celular: personaForm.nro_celular || null,
      direccion: personaForm.direccion || null,
      observaciones: personaForm.observaciones || null,
      fotografia: personaForm.fotografia || null,
      esta_activo: personaForm.esta_activo,
      grupo_id: personaForm.grupo_id,
    };

    try {
      const url = personaForm.id
        ? `${API_URL}/personas/${personaForm.id}`
        : `${API_URL}/personas/`;

      const method = personaForm.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("No se pudo guardar la persona");

      await cargarPersonas();
      resetPersonaForm();
    } catch (error) {
      console.error(error);
      alert("Error al guardar persona");
    }
  }

  function editarGrupo(grupo) {
    setActiveTab("grupos");
    setGrupoForm({
      id: grupo.id,
      nombre_grupo: grupo.nombre_grupo,
      esta_activo: grupo.esta_activo,
    });
  }

  function editarPersona(persona) {
    setActiveTab("personas");
    setPersonaForm({
      id: persona.id,
      nombres: persona.nombres || "",
      apellidos: persona.apellidos || "",
      correo: persona.correo || "",
      nro_celular: persona.nro_celular || "",
      direccion: persona.direccion || "",
      observaciones: persona.observaciones || "",
      fotografia: persona.fotografia || "",
      esta_activo: persona.esta_activo,
      grupo_id: persona.grupo_id || "",
    });
  }

  function obtenerNombreGrupo(grupoId) {
    const grupo = grupos.find((g) => g.id === grupoId);
    return grupo ? grupo.nombre_grupo : "Sin grupo";
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Gestión de Contactos</h1>
        <p>Frontend en React para administración de personas y grupos</p>
      </header>

      <main className="container">
        <section className="panel">
          <div className="tabs">
            <button
              className={activeTab === "personas" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("personas")}
            >
              Personas
            </button>
            <button
              className={activeTab === "grupos" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("grupos")}
            >
              Grupos
            </button>
          </div>

          {activeTab === "personas" && (
            <>
              <div className="section-header">
                <h2>Registrar / Editar Persona</h2>
              </div>

              <form className="form-grid" onSubmit={handlePersonaSubmit}>
                <div>
                  <label>Nombres</label>
                  <input
                    type="text"
                    value={personaForm.nombres}
                    onChange={(e) =>
                      setPersonaForm({ ...personaForm, nombres: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label>Apellidos</label>
                  <input
                    type="text"
                    value={personaForm.apellidos}
                    onChange={(e) =>
                      setPersonaForm({ ...personaForm, apellidos: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label>Correo</label>
                  <input
                    type="email"
                    value={personaForm.correo}
                    onChange={(e) =>
                      setPersonaForm({ ...personaForm, correo: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Nro. Celular</label>
                  <input
                    type="text"
                    value={personaForm.nro_celular}
                    onChange={(e) =>
                      setPersonaForm({ ...personaForm, nro_celular: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Dirección</label>
                  <input
                    type="text"
                    value={personaForm.direccion}
                    onChange={(e) =>
                      setPersonaForm({ ...personaForm, direccion: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Grupo</label>
                  <select
                    value={personaForm.grupo_id}
                    onChange={(e) =>
                      setPersonaForm({ ...personaForm, grupo_id: e.target.value })
                    }
                    required
                  >
                    {grupos.map((grupo) => (
                      <option key={grupo.id} value={grupo.id}>
                        {grupo.nombre_grupo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="full-width">
                  <label>Observaciones</label>
                  <textarea
                    rows="3"
                    value={personaForm.observaciones}
                    onChange={(e) =>
                      setPersonaForm({
                        ...personaForm,
                        observaciones: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="full-width">
                  <label>Fotografía (URL)</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={personaForm.fotografia}
                    onChange={(e) =>
                      setPersonaForm({ ...personaForm, fotografia: e.target.value })
                    }
                  />
                </div>

                <div className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={personaForm.esta_activo}
                    onChange={(e) =>
                      setPersonaForm({
                        ...personaForm,
                        esta_activo: e.target.checked,
                      })
                    }
                  />
                  <label>Está activo</label>
                </div>

                <div className="full-width actions">
                  <button type="submit" className="btn primary">
                    {personaForm.id ? "Actualizar Persona" : "Guardar Persona"}
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={resetPersonaForm}
                  >
                    Cancelar
                  </button>
                </div>
              </form>

              <div className="section-header">
                <h2>Lista de Personas</h2>
              </div>

              <div className="cards">
                {personas.map((persona) => (
                  <div className="card" key={persona.id}>
                    <img
                      src={
                        persona.fotografia && persona.fotografia.trim() !== ""
                          ? persona.fotografia
                          : "https://via.placeholder.com/400x250?text=Sin+Foto"
                      }
                      alt={`${persona.nombres} ${persona.apellidos}`}
                    />

                    <div className="card-body">
                      <h3>
                        {persona.nombres} {persona.apellidos}
                      </h3>
                      <p><strong>Correo:</strong> {persona.correo || "-"}</p>
                      <p><strong>Celular:</strong> {persona.nro_celular || "-"}</p>
                      <p><strong>Dirección:</strong> {persona.direccion || "-"}</p>
                      <p><strong>Observaciones:</strong> {persona.observaciones || "-"}</p>
                      <p><strong>Grupo:</strong> {obtenerNombreGrupo(persona.grupo_id)}</p>

                      <span
                        className={
                          persona.esta_activo ? "badge active" : "badge inactive"
                        }
                      >
                        {persona.esta_activo ? "Activo" : "Inactivo"}
                      </span>

                      <div className="card-actions">
                        <button
                          className="btn edit"
                          onClick={() => editarPersona(persona)}
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "grupos" && (
            <>
              <div className="section-header">
                <h2>Registrar / Editar Grupo</h2>
              </div>

              <form className="form-grid" onSubmit={handleGrupoSubmit}>
                <div>
                  <label>Nombre del grupo</label>
                  <input
                    type="text"
                    value={grupoForm.nombre_grupo}
                    onChange={(e) =>
                      setGrupoForm({ ...grupoForm, nombre_grupo: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={grupoForm.esta_activo}
                    onChange={(e) =>
                      setGrupoForm({
                        ...grupoForm,
                        esta_activo: e.target.checked,
                      })
                    }
                  />
                  <label>Está activo</label>
                </div>

                <div className="full-width actions">
                  <button type="submit" className="btn primary">
                    {grupoForm.id ? "Actualizar Grupo" : "Guardar Grupo"}
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={resetGrupoForm}
                  >
                    Cancelar
                  </button>
                </div>
              </form>

              <div className="section-header">
                <h2>Lista de Grupos</h2>
              </div>

              <div className="group-list">
                {grupos.map((grupo) => (
                  <div className="group-item" key={grupo.id}>
                    <div className="group-info">
                      <strong>{grupo.nombre_grupo}</strong>
                      <span
                        className={
                          grupo.esta_activo ? "badge active" : "badge inactive"
                        }
                      >
                        {grupo.esta_activo ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    <div>
                      <button
                        className="btn edit"
                        onClick={() => editarGrupo(grupo)}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;