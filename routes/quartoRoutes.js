const express = require('express');
const router = express.Router();
const quartoController = require('../controllers/quartoController');

const authMiddleware = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', quartoController.listarQuartos);

router.post('/', authMiddleware, requireAdmin, quartoController.criarQuarto);
router.put('/:id', authMiddleware, requireAdmin, quartoController.atualizarQuarto);
router.delete('/:id', authMiddleware, requireAdmin, quartoController.deletarQuarto);

module.exports = router;
