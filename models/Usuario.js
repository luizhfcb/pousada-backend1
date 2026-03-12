const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cargo: { type: String, enum: ['admin', 'recepcionista','manutencao','limpeza' ], default: 'recepcionista' },
  servicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servico' }]
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);