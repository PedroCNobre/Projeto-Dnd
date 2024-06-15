const mongoose = require('mongoose');

const magiaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  nivel: { type: Number, required: true },
  escola: { type: String, required: true }
});

module.exports = mongoose.model('Magia', magiaSchema);
