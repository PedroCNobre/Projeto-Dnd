const mongoose = require('mongoose');

const racaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  atributos: {
    forca: { type: Number, required: true },
    destreza: { type: Number, required: true },
    constituicao: { type: Number, required: true },
    inteligencia: { type: Number, required: true },
    sabedoria: { type: Number, required: true },
    carisma: { type: Number, required: true }
  }
});

module.exports = mongoose.model('Raca', racaSchema);
