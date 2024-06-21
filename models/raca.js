const mongoose = require('mongoose');

const racaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  forca: { type: String, required: true },
  destreza: { type: String, required: true },
  constituicao: { type: String, required: true },
  inteligencia: { type: String, required: true },
  sabedoria: { type: String, required: true },
  carisma: { type: String, required: true }
});

module.exports = mongoose.model('Raca', racaSchema);
