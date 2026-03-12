const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  funcionariosAptos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
}, { timestamps: true });

module.exports = mongoose.model('Servico', servicoSchema);