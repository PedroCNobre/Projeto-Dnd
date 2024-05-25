const mongoose = require('mongoose');

const racaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  idioma: String,
  modificadorPrincipal: String,
  modificadorSecundario: String
});

module.exports = mongoose.model('Raca', racaSchema);
