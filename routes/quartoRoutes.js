const express = require('express');
const router = express.Router();
const quartoController = require('../controllers/quartoController');

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', quartoController.listarQuartos);

router.post('/', authMiddleware, quartoController.criarQuarto);
router.put('/:id', authMiddleware, quartoController.atualizarQuarto);
router.delete('/:id', authMiddleware, quartoController.deletarQuarto);

module.exports = router;