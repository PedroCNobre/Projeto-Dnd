const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  qtdAtaques: Number,
  dadosVida: Number
});

module.exports = mongoose.model('Classe', classeSchema);
