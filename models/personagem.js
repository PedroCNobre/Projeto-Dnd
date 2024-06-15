const mongoose = require('mongoose');

const personagemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  raca: { type: mongoose.Schema.Types.ObjectId, ref: 'Raca', required: true },
  classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe', required: true },
  nivel: { type: Number, required: true },
  pontosVida: { type: Number, required: true },
  armadura: { type: mongoose.Schema.Types.ObjectId, ref: 'Armadura', required: true },
  armas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Arma' }],
  magias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Magia' }]
});

module.exports = mongoose.model('Personagem', personagemSchema);
