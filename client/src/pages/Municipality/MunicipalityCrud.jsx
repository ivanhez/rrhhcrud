import React, { useEffect, useState } from 'react'
import api from '../../services/api'

function MunicipalityCrud() {
  const [municipalities, setMunicipalities] = useState([])
  const [departments, setDepartments] = useState([])
  const [name, setName] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const fetchData = async () => {
    const [munRes, deptRes] = await Promise.all([
      api.get('/municipalities'),
      api.get('/departments')
    ])
    setMunicipalities(munRes.data)
    setDepartments(deptRes.data)
  }

  const createMunicipality = async () => {
    await api.post('/municipalities', { name, department_id: departmentId })
    setName('')
    setDepartmentId('')
    fetchData()
  }

  const updateMunicipality = async () => {
    await api.put(`/municipalities/${editId}`, { name, department_id: departmentId })
    setName('')
    setDepartmentId('')
    setEditing(false)
    setEditId(null)
    fetchData()
  }

  const deleteMunicipality = async (id) => {
    await api.delete(`/municipalities/${id}`)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      updateMunicipality()
    } else {
      createMunicipality()
    }
  }

  const handleEdit = (municipality) => {
    setEditing(true)
    setEditId(municipality.id)
    setName(municipality.name)
    setDepartmentId(municipality.department_id)
  }

  return (
    <div>
      <h2>Mantenimiento de Municipios</h2>
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
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
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
                <button onClick={() => deleteMunicipality(mun.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MunicipalityCrud
