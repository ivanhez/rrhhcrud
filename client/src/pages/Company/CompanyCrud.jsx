import React, { useEffect, useState } from 'react'
import api from '../../services/api'

function CompanyCrud() {
  const [companies, setCompanies] = useState([])
  const [countries, setCountries] = useState([])
  const [departments, setDepartments] = useState([])
  const [municipalities, setMunicipalities] = useState([])

  const [countryId, setCountryId] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [municipalityId, setMunicipalityId] = useState('')
  const [nit, setNit] = useState('')
  const [razonSocial, setRazonSocial] = useState('')
  const [nombreComercial, setNombreComercial] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')

  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const fetchData = async () => {
    const [compRes, cRes, dRes, mRes] = await Promise.all([
      api.get('/companies'),
      api.get('/countries'),
      api.get('/departments'),
      api.get('/municipalities')
    ])
    setCompanies(compRes.data)
    setCountries(cRes.data)
    setDepartments(dRes.data)
    setMunicipalities(mRes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      country_id: countryId,
      department_id: departmentId,
      municipality_id: municipalityId,
      nit,
      razon_social: razonSocial,
      nombre_comercial: nombreComercial,
      telefono,
      correo_electronico: correoElectronico
    }

    if (editing) {
      await api.put(`/companies/${editId}`, payload)
      setEditing(false)
      setEditId(null)
    } else {
      await api.post('/companies', payload)
    }

    setCountryId('')
    setDepartmentId('')
    setMunicipalityId('')
    setNit('')
    setRazonSocial('')
    setNombreComercial('')
    setTelefono('')
    setCorreoElectronico('')

    fetchData()
  }

  const handleEdit = (company) => {
    setEditing(true)
    setEditId(company.id)
    setCountryId(company.country_id)
    setDepartmentId(company.department_id)
    setMunicipalityId(company.municipality_id)
    setNit(company.nit)
    setRazonSocial(company.razon_social)
    setNombreComercial(company.nombre_comercial)
    setTelefono(company.telefono || '')
    setCorreoElectronico(company.correo_electronico || '')
  }

  const handleDelete = async (id) => {
    await api.delete(`/companies/${id}`)
    fetchData()
  }

  return (
    <div>
      <h2>Mantenimiento de Empresas</h2>
      <form onSubmit={handleSubmit}>
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
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Municipio:</label>
          <select
            value={municipalityId}
            onChange={(e) => setMunicipalityId(e.target.value)}
            required
          >
            <option value="">Seleccione un municipio</option>
            {municipalities.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>NIT:</label>
          <input
            type="text"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Razón Social:</label>
          <input
            type="text"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre Comercial:</label>
          <input
            type="text"
            value={nombreComercial}
            onChange={(e) => setNombreComercial(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </div>
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
      </form>
    
    <div className="table-responsive">
      <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>País</th>
            <th>Departamento</th>
            <th>Municipio</th>
            <th>NIT</th>
            <th>Razón Social</th>
            <th>Nombre Comercial</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.country_name}</td>
              <td>{company.department_name}</td>
              <td>{company.municipality_name}</td>
              <td>{company.nit}</td>
              <td>{company.razon_social}</td>
              <td>{company.nombre_comercial}</td>
              <td>{company.telefono}</td>
              <td>{company.correo_electronico}</td>
              <td>
                <button onClick={() => handleEdit(company)}>Editar</button>
                <button onClick={() => handleDelete(company.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default CompanyCrud
