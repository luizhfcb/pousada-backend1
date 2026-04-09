const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');
const authMiddleware = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin');

router.post('/', authMiddleware, requireAdmin, servicoController.criarServico);
router.get('/', authMiddleware, requireAdmin, servicoController.listarServicos);

module.exports = router;
