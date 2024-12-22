const express = require('express');
const router = express.Router();
const collaboratorController = require('../controllers/collaboratorController');

router.get('/', collaboratorController.getAllCollaborators);
router.get('/:id', collaboratorController.getCollaboratorById);
router.post('/', collaboratorController.createCollaborator);
router.put('/:id', collaboratorController.updateCollaborator);
router.delete('/:id', collaboratorController.deleteCollaborator);

router.post('/assign', collaboratorController.assignToCompany);
router.post('/remove', collaboratorController.removeFromCompany);

module.exports = router;
