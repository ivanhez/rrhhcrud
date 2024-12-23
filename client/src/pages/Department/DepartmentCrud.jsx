import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function DepartmentCrud() {
  const [departments, setDepartments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const [deptRes, cRes] = await Promise.all([
        api.get("/departments"),
        api.get("/countries"),
      ]);
      setDepartments(deptRes.data);
      setCountries(cRes.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo cargar la información", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createDepartment = async () => {
    try {
      await api.post("/departments", { name, country_id: countryId });
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Departamento creado exitosamente",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      setName("");
      setCountryId("");
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el departamento", "error");
    }
  };

  const updateDepartment = async () => {
    try {
      await api.put(`/departments/${editId}`, {
        name,
        country_id: countryId,
      });
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "El departamento se actualizó correctamente",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      setName("");
      setCountryId("");
      setEditing(false);
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el departamento", "error");
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Eliminarás este departamento",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await api.delete(`/departments/${id}`);
        Swal.fire("Eliminado", "El departamento fue eliminado", "success");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo eliminar el departamento", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateDepartment();
    } else {
      createDepartment();
    }
  };

  const handleEdit = (dept) => {
    setEditing(true);
    setEditId(dept.id);
    setName(dept.name);
    setCountryId(dept.country_id);
  };

  return (
    <div>
      <h2>Mantenimiento de Departamentos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ej. Alta Verapaz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>País:</label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            required
          >
            <option value="">Seleccione un país</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Departamento</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td>{dept.id}</td>
                <td>{dept.name}</td>
                <td>{dept.country_name}</td>
                <td>
                  <button onClick={() => handleEdit(dept)}>Editar</button>
                  <button onClick={() => deleteDepartment(dept.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentCrud;
