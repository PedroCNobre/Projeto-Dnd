const mongoose = require('mongoose');

const armaduraSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  tipoArmadura: String,
  classeDefesa: Number
});

module.exports = mongoose.model('Armadura', armaduraSchema);
