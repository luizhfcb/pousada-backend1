const mongoose = require('mongoose');

const crachaSchema = new mongoose.Schema({
  codigoRfid: { type: String, required: true },
  dataEmissao: { type: Date, default: Date.now },
  

  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario',
    unique: true 
  }
});

module.exports = mongoose.model('Cracha', crachaSchema);