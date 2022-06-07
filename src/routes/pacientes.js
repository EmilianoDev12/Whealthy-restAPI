const { Router } = require('express');
const router = Router();
const pacientesCtrl = require('../controllers/pacientes.controller');

router.post('/actualizarDatos', pacientesCtrl.actualizarPaciente);
router.post('/buscarFich', pacientesCtrl.buscarFich);
router.post('/actualizarFich',pacientesCtrl.actualizarFich);

module.exports = router;