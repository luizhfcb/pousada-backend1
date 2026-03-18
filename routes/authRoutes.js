const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registrar', authController.registrar);

router.post('/login', authController.login);
router.get('/usuarios', authMiddleware, authController.listarUsuarios);

module.exports = router;