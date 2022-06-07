const { Router } = require('express');
const router = Router();
const citasCtrl = require('../controllers/recetas.controller');

router.post('/citasCtrl', citasCtrl.cargarReceta);
router.post('/actualizarCtrl', citasCtrl.actualizarReceta);

module.exports = router;