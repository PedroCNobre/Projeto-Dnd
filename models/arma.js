import mongoose from 'mongoose';
const armaSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  tipoDano: String,
  dano: String
});
const Arma = mongoose.model('Arma', armaSchema);
export default Arma;
