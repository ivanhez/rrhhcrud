import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`sidebar ${menuOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon"></span>
          <span className="logo-text">RRHH CRUD</span>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
        <NavLink
          to="/"
          end
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/countries"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Países
        </NavLink>
        <NavLink
          to="/departments"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Departamentos
        </NavLink>
        <NavLink
          to="/municipalities"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Municipios
        </NavLink>
        <NavLink
          to="/companies"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Empresas
        </NavLink>
        <NavLink
          to="/collaborators"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Colaboradores
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
