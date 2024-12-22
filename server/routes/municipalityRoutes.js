const express = require('express');
const router = express.Router();
const municipalityController = require('../controllers/municipalityController');

router.get('/', municipalityController.getAllMunicipalities);
router.get('/:id', municipalityController.getMunicipalityById);
router.post('/', municipalityController.createMunicipality);
router.put('/:id', municipalityController.updateMunicipality);
router.delete('/:id', municipalityController.deleteMunicipality);

module.exports = router;
