const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  habilidades: [{ type: String, required: true }]
});

module.exports = mongoose.model('Classe', classeSchema);
