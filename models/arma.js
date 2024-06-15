const mongoose = require('mongoose');

const armaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  dano: { type: String, required: true },
  tipo: { type: String, required: true }
});

module.exports = mongoose.model('Arma', armaSchema);
