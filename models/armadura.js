const mongoose = require('mongoose');

const armaduraSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  defesa: { type: Number, required: true },
  tipo: { type: String, required: true }
});

module.exports = mongoose.model('Armadura', armaduraSchema);
