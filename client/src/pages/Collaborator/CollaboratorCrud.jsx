import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function CollaboratorCrud() {
  const [collaborators, setCollaborators] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Para gestionar asignaciones
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);

  const fetchCollaborators = async () => {
    try {
      const res = await api.get("/collaborators");
      setCollaborators(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudo cargar la lista de colaboradores",
        "error"
      );
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies");
      setCompanies(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo cargar la lista de empresas", "error");
    }
  };

  useEffect(() => {
    fetchCollaborators();
    fetchCompanies();
  }, []);

  // Crear o actualizar colaborador
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre_completo: nombreCompleto,
      edad: parseInt(edad),
      telefono,
      correo_electronico: correoElectronico,
    };
    try {
      if (editing) {
        await api.put(`/collaborators/${editId}`, payload);
        Swal.fire({
          icon: "success",
          title: "Actualizado",
          text: "Colaborador actualizado correctamente",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
        setEditing(false);
        setEditId(null);
      } else {
        await api.post("/collaborators", payload);
        Swal.fire({
          icon: "success",
          title: "Creado",
          text: "Colaborador creado exitosamente",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      // Limpiar
      setNombreCompleto("");
      setEdad("");
      setTelefono("");
      setCorreoElectronico("");
      fetchCollaborators();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo procesar al colaborador", "error");
    }
  };

  const handleEdit = (coll) => {
    setEditing(true);
    setEditId(coll.id);
    setNombreCompleto(coll.nombre_completo);
    setEdad(coll.edad);
    setTelefono(coll.telefono);
    setCorreoElectronico(coll.correo_electronico);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Eliminarás a este colaborador definitivamente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await api.delete(`/collaborators/${id}`);
        Swal.fire("Eliminado", "El colaborador fue eliminado", "success");
        fetchCollaborators();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo eliminar al colaborador", "error");
    }
  };

  // Gestionar asignación de empresas
  const handleManageCompanies = async (collaboratorId) => {
    try {
      const res = await api.get(`/collaborators/${collaboratorId}`);
      const data = {
        ...res.data.collaborator,
        companies: res.data.companies,
      };
      setSelectedCollaborator(data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudo cargar la información del colaborador",
        "error"
      );
    }
  };

  const handleAssignCompany = async (companyId) => {
    if (!selectedCollaborator) return;
    try {
      await api.post("/collaborators/assign", {
        collaboratorId: selectedCollaborator.id,
        companyId,
      });
      Swal.fire({
        icon: "success",
        title: "Asignado",
        text: "Colaborador asignado a empresa",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      handleManageCompanies(selectedCollaborator.id);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo asignar la empresa", "error");
    }
  };

  const handleRemoveCompany = async (companyId) => {
    if (!selectedCollaborator) return;
    try {
      const result = await Swal.fire({
        title: "¿Remover empresa?",
        text: "Se removerá la relación con este colaborador",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, remover",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await api.post("/collaborators/remove", {
          collaboratorId: selectedCollaborator.id,
          companyId,
        });
        Swal.fire(
          "Removido",
          "El colaborador fue removido de la empresa",
          "success"
        );
        handleManageCompanies(selectedCollaborator.id);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo remover la empresa", "error");
    }
  };

  const isAssigned = (company) => {
    if (!selectedCollaborator) return false;
    return selectedCollaborator.companies.some((c) => c.id === company.id);
  };

  return (
    <div>
      <h2>Mantenimiento de Colaboradores</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo:</label>
          <input
            type="text"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Ej. 30"
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="5555-5555"
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </div>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      <hr />

      <h3>Lista de Colaboradores</h3>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {collaborators.map((coll) => (
              <tr key={coll.id}>
                <td>{coll.id}</td>
                <td>{coll.nombre_completo}</td>
                <td>{coll.edad}</td>
                <td>{coll.telefono}</td>
                <td>{coll.correo_electronico}</td>
                <td>
                  <button onClick={() => handleEdit(coll)}>Editar</button>
                  <button onClick={() => handleDelete(coll.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => handleManageCompanies(coll.id)}>
                    Gestionar Empresas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Sección para asignar/quitar empresas al colaborador seleccionado */}
      {selectedCollaborator && (
        <div style={{ marginTop: "2rem" }}>
          <h4>Empresas para: {selectedCollaborator.nombre_completo}</h4>
          <p>ID: {selectedCollaborator.id}</p>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Comercial</th>
                  <th>NIT</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((co) => {
                  const assigned = isAssigned(co);
                  return (
                    <tr key={co.id}>
                      <td>{co.id}</td>
                      <td>{co.nombre_comercial}</td>
                      <td>{co.nit}</td>
                      <td>
                        {assigned ? (
                          <button onClick={() => handleRemoveCompany(co.id)}>
                            Remover
                          </button>
                        ) : (
                          <button onClick={() => handleAssignCompany(co.id)}>
                            Asignar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollaboratorCrud;
