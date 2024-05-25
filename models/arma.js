const mongoose = require('mongoose');

const armaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  tipoDano: String,
  dano: String
});

module.exports = mongoose.model('Arma', armaSchema);
