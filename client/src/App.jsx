import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CountryCrud from './pages/Country/CountryCrud'
import DepartmentCrud from './pages/Department/DepartmentCrud'
import MunicipalityCrud from './pages/Municipality/MunicipalityCrud'
import CompanyCrud from './pages/Company/CompanyCrud'
import CollaboratorCrud from './pages/Collaborator/CollaboratorCrud'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<CountryCrud />} />
        <Route path="/departments" element={<DepartmentCrud />} />
        <Route path="/municipalities" element={<MunicipalityCrud />} />
        <Route path="/companies" element={<CompanyCrud />} />
        <Route path="/collaborators" element={<CollaboratorCrud />} />
      </Routes>
    </Layout>
  )
}

export default App
