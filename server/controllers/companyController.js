const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: 'Empresa no encontrada' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const {
      country_id,
      department_id,
      municipality_id,
      nit,
      razon_social,
      nombre_comercial,
      telefono,
      correo_electronico
    } = req.body;

    const newId = await Company.create(
      country_id,
      department_id,
      municipality_id,
      nit,
      razon_social,
      nombre_comercial,
      telefono,
      correo_electronico
    );

    res.json({
      id: newId,
      country_id,
      department_id,
      municipality_id,
      nit,
      razon_social,
      nombre_comercial,
      telefono,
      correo_electronico
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      country_id,
      department_id,
      municipality_id,
      nit,
      razon_social,
      nombre_comercial,
      telefono,
      correo_electronico
    } = req.body;

    await Company.update(
      id,
      country_id,
      department_id,
      municipality_id,
      nit,
      razon_social,
      nombre_comercial,
      telefono,
      correo_electronico
    );

    res.json({ message: 'Empresa actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.delete(id);
    res.json({ message: 'Empresa eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
