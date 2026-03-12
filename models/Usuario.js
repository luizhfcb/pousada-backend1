const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cargo: { type: String, enum: ['admin', 'recepcionista'], default: 'recepcionista' }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);