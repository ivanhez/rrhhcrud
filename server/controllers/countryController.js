const Country = require('../models/Country');

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) return res.status(404).json({ message: 'País no encontrado' });
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const newId = await Country.create(name);
    res.json({ id: newId, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Country.update(id, name);
    res.json({ message: 'País actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.delete(id);
    res.json({ message: 'País eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
