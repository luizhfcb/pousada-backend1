const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  hospede: { type: String, required: true },
  cpf: { type: String, required: true },
  quarto: { type: mongoose.Schema.Types.ObjectId, ref: 'Quarto', required: true }, // Relacionamento com Quarto
  dataCheckIn: { type: Date, required: true },
  dataCheckOut: { type: Date, required: true },
  status: { type: String, enum: ['pendente', 'confirmada', 'cancelada'], default: 'pendente' }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);