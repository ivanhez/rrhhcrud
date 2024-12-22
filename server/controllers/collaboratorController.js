const Collaborator = require('../models/Collaborator');

exports.getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.findAll();
    res.json(collaborators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollaboratorById = async (req, res) => {
  try {
    const { id } = req.params;
    const collaborator = await Collaborator.findById(id);
    if (!collaborator) return res.status(404).json({ message: 'Colaborador no encontrado' });

    // Además, traemos las empresas a las que pertenece
    const companies = await Collaborator.findCompaniesByCollaborator(id);
    res.json({ collaborator, companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCollaborator = async (req, res) => {
  try {
    const { nombre_completo, edad, telefono, correo_electronico } = req.body;
    const newId = await Collaborator.create(nombre_completo, edad, telefono, correo_electronico);
    res.json({ id: newId, nombre_completo, edad, telefono, correo_electronico });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCollaborator = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, edad, telefono, correo_electronico } = req.body;
    await Collaborator.update(id, nombre_completo, edad, telefono, correo_electronico);
    res.json({ message: 'Colaborador actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCollaborator = async (req, res) => {
  try {
    const { id } = req.params;
    await Collaborator.delete(id);
    res.json({ message: 'Colaborador eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Asignar Colaborador a una Empresa
exports.assignToCompany = async (req, res) => {
  try {
    const { collaboratorId, companyId } = req.body;
    await Collaborator.addToCompany(companyId, collaboratorId);
    res.json({ message: 'Colaborador asignado a la empresa exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remover Colaborador de una Empresa
exports.removeFromCompany = async (req, res) => {
  try {
    const { collaboratorId, companyId } = req.body;
    await Collaborator.removeFromCompany(companyId, collaboratorId);
    res.json({ message: 'Colaborador removido de la empresa exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
