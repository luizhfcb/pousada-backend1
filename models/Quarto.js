const mongoose = require('mongoose');

const quartoSchema = new mongoose.Schema({
  numero: { type: String, required: true, unique: true },
  tipo: { type: String, enum: ['simples', 'duplo', 'suite'], required: true },
  precoDiaria: { type: Number, required: true },
  disponivel: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Quarto', quartoSchema);