import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; 

function CountryCrud() {
  const [countries, setCountries] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Cargar países
  const fetchCountries = async () => {
    try {
      const res = await api.get("/countries");
      setCountries(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Crear nuevo país
  const createCountry = async () => {
    try {
      await api.post("/countries", { name });
      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "El país se creó correctamente",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      setName("");
      fetchCountries();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear el país", "error");
    }
  };

  // Actualizar país
  const updateCountry = async () => {
    try {
      await api.put(`/countries/${editId}`, { name });
      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "El país se actualizó correctamente",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });
      setName("");
      setEditing(false);
      setEditId(null);
      fetchCountries();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar el país", "error");
    }
  };

  // Eliminar país
  const deleteCountry = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará el país definitivamente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
      if (result.isConfirmed) {
        await api.delete(`/countries/${id}`);
        Swal.fire("Eliminado", "El país se eliminó correctamente", "success");
        fetchCountries();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo eliminar el país", "error");
    }
  };

  // Manejo de submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateCountry();
    } else {
      createCountry();
    }
  };

  // Manejar la edición
  const handleEdit = (country) => {
    setEditing(true);
    setName(country.name);
    setEditId(country.id);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Mantenimiento de Países</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del País:</label>
          <input
            type="text"
            placeholder="Ej. Guatemala"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id}>
                <td>{country.id}</td>
                <td>{country.name}</td>
                <td>
                  <button onClick={() => handleEdit(country)}>Editar</button>
                  <button onClick={() => deleteCountry(country.id)}>
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

export default CountryCrud;
