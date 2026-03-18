const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, servicoController.criarServico);
router.get('/', authMiddleware, servicoController.listarServicos);

module.exports = router;