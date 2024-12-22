import React, { useEffect, useState } from 'react'
import api from '../../services/api'

function CountryCrud() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState('')
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const fetchCountries = async () => {
    const res = await api.get('/countries')
    setCountries(res.data)
  }

  const createCountry = async () => {
    await api.post('/countries', { name })
    setName('')
    fetchCountries()
  }

  const updateCountry = async () => {
    await api.put(`/countries/${editId}`, { name })
    setName('')
    setEditing(false)
    setEditId(null)
    fetchCountries()
  }

  const deleteCountry = async (id) => {
    await api.delete(`/countries/${id}`)
    fetchCountries()
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      updateCountry()
    } else {
      createCountry()
    }
  }

  const handleEdit = (country) => {
    setEditing(true)
    setName(country.name)
    setEditId(country.id)
  }

  return (
    <div>
      <h2>Mantenimiento de Países</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del País:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
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
                <button onClick={() => deleteCountry(country.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default CountryCrud
