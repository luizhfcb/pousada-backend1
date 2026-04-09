const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin');

router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

router.get('/usuarios', authMiddleware, requireAdmin, authController.listarUsuarios);
router.post('/usuarios', authMiddleware, requireAdmin, authController.criarUsuario);
router.put('/usuarios/:id', authMiddleware, requireAdmin, authController.atualizarUsuario);
router.delete('/usuarios/:id', authMiddleware, requireAdmin, authController.deletarUsuario);

module.exports = router;
