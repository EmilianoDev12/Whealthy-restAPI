const { Router } = require('express');
const router = Router();
const citasCtrl = require('../controllers/citas.controller');

router.post('/buscarDocs',citasCtrl.buscarDocs);
router.post('/registrar',citasCtrl.registrarCita);
router.post('/buscarPac', citasCtrl.citasPac);
router.post('/buscarMedo',citasCtrl.citasMedo);
router.post('/idPac',citasCtrl.buscarPac);
router.post('/idCit',citasCtrl.buscarId);

module.exports = router;