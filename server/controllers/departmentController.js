const Department = require('../models/Department');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) return res.status(404).json({ message: 'Departamento no encontrado' });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name, country_id } = req.body;
    const newId = await Department.create(name, country_id);
    res.json({ id: newId, name, country_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country_id } = req.body;
    await Department.update(id, name, country_id);
    res.json({ message: 'Departamento actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.delete(id);
    res.json({ message: 'Departamento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
