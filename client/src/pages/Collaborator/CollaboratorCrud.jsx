import React, { useEffect, useState } from 'react'
import api from '../../services/api'

function CollaboratorCrud() {
  const [collaborators, setCollaborators] = useState([])
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [edad, setEdad] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [editing, setEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const [allCompanies, setAllCompanies] = useState([])
  const [selectedCollaborator, setSelectedCollaborator] = useState(null) 
  
  const fetchCollaborators = async () => {
    const res = await api.get('/collaborators')
    setCollaborators(res.data)
  }

  const fetchAllCompanies = async () => {
    const res = await api.get('/companies')
    setAllCompanies(res.data)
  }

  useEffect(() => {
    fetchCollaborators()
    fetchAllCompanies()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      nombre_completo: nombreCompleto,
      edad: parseInt(edad),
      telefono,
      correo_electronico: correoElectronico
    }
    if (editing) {
      await api.put(`/collaborators/${editId}`, payload)
      setEditing(false)
      setEditId(null)
    } else {
      await api.post('/collaborators', payload)
    }
    setNombreCompleto('')
    setEdad('')
    setTelefono('')
    setCorreoElectronico('')
    fetchCollaborators()
  }

  const handleEdit = (coll) => {
    setEditing(true)
    setEditId(coll.id)
    setNombreCompleto(coll.nombre_completo)
    setEdad(coll.edad)
    setTelefono(coll.telefono)
    setCorreoElectronico(coll.correo_electronico)
  }

  const handleDelete = async (id) => {
    await api.delete(`/collaborators/${id}`)
    fetchCollaborators()
    if (id === editId) {
      setEditing(false)
      setEditId(null)
      setNombreCompleto('')
      setEdad('')
      setTelefono('')
      setCorreoElectronico('')
    }
  }

  const handleManageCompanies = async (collaboratorId) => {
    const res = await api.get(`/collaborators/${collaboratorId}`)
    const data = {
      ...res.data.collaborator,
      companies: res.data.companies
    }
    setSelectedCollaborator(data)
  }

  const handleAssignCompany = async (companyId) => {
    if (!selectedCollaborator) return
    await api.post('/collaborators/assign', {
      collaboratorId: selectedCollaborator.id,
      companyId
    })
    handleManageCompanies(selectedCollaborator.id)
  }

  const handleRemoveCompany = async (companyId) => {
    if (!selectedCollaborator) return
    await api.post('/collaborators/remove', {
      collaboratorId: selectedCollaborator.id,
      companyId
    })
    handleManageCompanies(selectedCollaborator.id)
  }

  const isAssigned = (company) => {
    if (!selectedCollaborator) return false
    return selectedCollaborator.companies.some((c) => c.id === company.id)
  }

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
            required
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
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
        <button type="submit">
          {editing ? 'Actualizar Colaborador' : 'Crear Colaborador'}
        </button>
      </form>

      <hr />

      <h3>Lista de Colaboradores</h3>
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
                <button onClick={() => handleDelete(coll.id)}>Eliminar</button>
                <button onClick={() => handleManageCompanies(coll.id)}>
                  Gestionar Empresas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCollaborator && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Empresas para el colaborador: {selectedCollaborator.nombre_completo}</h3>
          <p>ID Colaborador: {selectedCollaborator.id}</p>

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
              {allCompanies.map((company) => {
                const assigned = isAssigned(company)
                return (
                  <tr key={company.id}>
                    <td>{company.id}</td>
                    <td>{company.nombre_comercial}</td>
                    <td>{company.nit}</td>
                    <td>
                      {assigned ? (
                        <button onClick={() => handleRemoveCompany(company.id)}>
                          Remover
                        </button>
                      ) : (
                        <button onClick={() => handleAssignCompany(company.id)}>
                          Asignar
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CollaboratorCrud
