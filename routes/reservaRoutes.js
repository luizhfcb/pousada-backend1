const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, reservaController.criarReserva);
router.get('/', authMiddleware, reservaController.listarReservas);
router.put('/:id', authMiddleware, reservaController.atualizarReserva);
router.delete('/:id', authMiddleware, reservaController.deletarReserva);

module.exports = router;