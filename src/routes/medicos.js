const { Router } = require('express');
const router = Router();
const medicosCtrl = require('../controllers/medicos.controller');


router.post('/actualizarDatos',medicosCtrl.actualizarMedico);

module.exports = router;