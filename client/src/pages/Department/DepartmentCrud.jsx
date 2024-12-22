import React, { useEffect, useState } from 'react'
import api from '../../services/api'

function DepartmentCrud() {
  const [departments, setDepartments] = useState([])
  const [countries, setCountries] = useState([])
  const [name, setName] = useState('')
  const [countryId, setCountryId] = useState('')
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const fetchData = async () => {
    const [deptRes, countryRes] = await Promise.all([
      api.get('/departments'),
      api.get('/countries')
    ])
    setDepartments(deptRes.data)
    setCountries(countryRes.data)
  }

  const createDepartment = async () => {
    await api.post('/departments', { name, country_id: countryId })
    setName('')
    setCountryId('')
    fetchData()
  }

  const updateDepartment = async () => {
    await api.put(`/departments/${editId}`, { name, country_id: countryId })
    setName('')
    setCountryId('')
    setEditing(false)
    setEditId(null)
    fetchData()
  }

  const deleteDepartment = async (id) => {
    await api.delete(`/departments/${id}`)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      updateDepartment()
    } else {
      createDepartment()
    }
  }

  const handleEdit = (department) => {
    setEditing(true)
    setEditId(department.id)
    setName(department.name)
    setCountryId(department.country_id)
  }

  return (
    <div>
      <h2>Mantenimiento de Departamentos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
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
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
      </form>

            <div className="table-responsive">
      <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
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
                <button onClick={() => deleteDepartment(dept.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default DepartmentCrud
