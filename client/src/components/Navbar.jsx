import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon"></span>
        <span className="logo-text">RRHHCRUD</span>
      </div>
      <nav className="nav-links">
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Inicio
        </NavLink>
        <NavLink 
          to="/countries"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Países
        </NavLink>
        <NavLink 
          to="/departments"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Departamentos
        </NavLink>
        <NavLink 
          to="/municipalities"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Municipios
        </NavLink>
        <NavLink 
          to="/companies"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Empresas
        </NavLink>
        <NavLink 
          to="/collaborators"
          className={({ isActive }) => isActive ? 'active-link' : ''}
        >
          Colaboradores
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar
