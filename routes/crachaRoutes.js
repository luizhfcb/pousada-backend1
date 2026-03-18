const express = require('express');
const router = express.Router();
const crachaController = require('../controllers/crachaController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/', authMiddleware, crachaController.criarCracha);

module.exports = router;