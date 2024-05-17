import mongoose from 'mongoose';
const classeSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  qtdAtaques: Number,
  dadosVida: String
});
const Classe = mongoose.model('Classe', classeSchema);
export default Classe;
