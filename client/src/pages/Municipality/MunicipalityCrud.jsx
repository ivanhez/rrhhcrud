import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function MunicipalityCrud() {
  const [municipalities, setMunicipalities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const [munRes, deptRes] = await Promise.all([
        api.get("/municipalities"),
        api.get("/departments"),
      ]);
      setMunicipalities(munRes.data);
      setDepartments(deptRes.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudo cargar la información de municipios",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createMunicipality = async () => {
    try {
      await api.post("/municipalities", {
        name,
        department_id: departmentId,
      });
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Municipio creado con éxito",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      setName("");
      setDepartmentId("");
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el municipio", "error");
    }
  };

  const updateMunicipality = async () => {
    try {
      await api.put(`/municipalities/${editId}`, {
        name,
        department_id: departmentId,
      });
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Municipio actualizado correctamente",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      setName("");
      setDepartmentId("");
      setEditing(false);
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el municipio", "error");
    }
  };

  const deleteMunicipality = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Eliminarás este municipio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await api.delete(`/municipalities/${id}`);
        Swal.fire("Eliminado", "El municipio fue eliminado", "success");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo eliminar el municipio", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateMunicipality();
    } else {
      createMunicipality();
    }
  };

  const handleEdit = (mun) => {
    setEditing(true);
    setEditId(mun.id);
    setName(mun.name);
    setDepartmentId(mun.department_id);
  };

  return (
    <div>
      <h2>Mantenimiento de Municipios</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Ej. Cobán"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Departamento:</label>
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="">Seleccione un departamento</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} - {d.country_name}
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
              <th>Municipio</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {municipalities.map((mun) => (
              <tr key={mun.id}>
                <td>{mun.id}</td>
                <td>{mun.name}</td>
                <td>{mun.department_name}</td>
                <td>
                  <button onClick={() => handleEdit(mun)}>Editar</button>
                  <button onClick={() => deleteMunicipality(mun.id)}>
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

export default MunicipalityCrud;
