const Municipality = require('../models/Municipality');

exports.getAllMunicipalities = async (req, res) => {
  try {
    const municipalities = await Municipality.findAll();
    res.json(municipalities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMunicipalityById = async (req, res) => {
  try {
    const { id } = req.params;
    const municipality = await Municipality.findById(id);
    if (!municipality) return res.status(404).json({ message: 'Municipio no encontrado' });
    res.json(municipality);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMunicipality = async (req, res) => {
  try {
    const { name, department_id } = req.body;
    const newId = await Municipality.create(name, department_id);
    res.json({ id: newId, name, department_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMunicipality = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department_id } = req.body;
    await Municipality.update(id, name, department_id);
    res.json({ message: 'Municipio actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMunicipality = async (req, res) => {
  try {
    const { id } = req.params;
    await Municipality.delete(id);
    res.json({ message: 'Municipio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
