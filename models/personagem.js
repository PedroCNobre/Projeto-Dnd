import mongoose from 'mongoose';

const personagemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  raca: { type: mongoose.Schema.Types.ObjectId, ref: 'Raca' },
  classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' },
  nivel: { type: Number, default: 1 },
  atributos: {
    forca: Number,
    destreza: Number,
    constituicao: Number,
    inteligencia: Number,
    sabedoria: Number,
    carisma: Number
  },
  vida: Number,
  historia: String,
  armadura: { type: mongoose.Schema.Types.ObjectId, ref: 'Armadura' },
  armas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Arma' }],
  magias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Magia' }]
});

export default mongoose.model('Personagem', personagemSchema);

