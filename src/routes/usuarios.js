const { Router } = require('express');
const router = Router();
const usuariosCtrl = require('../controllers/usuarios.controller');

router.post('/registrarUsuario',usuariosCtrl.registrarUsuario);
router.post('/iniciarSesion',usuariosCtrl.buscarUsuario);
router.post('/buscar', usuariosCtrl.busqueda);

module.exports = router;