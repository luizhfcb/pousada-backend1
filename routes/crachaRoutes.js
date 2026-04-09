const express = require('express');
const router = express.Router();
const crachaController = require('../controllers/crachaController');
const authMiddleware = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', authMiddleware, requireAdmin, crachaController.listarCrachas);
router.post('/', authMiddleware, requireAdmin, crachaController.criarCracha);

module.exports = router;
