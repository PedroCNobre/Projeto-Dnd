import mongoose from 'mongoose';
const magiaSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  elemento: String,
  escolaMagia: String,
  dano: String
});
const Magia = mongoose.model('Magia', magiaSchema);
export default Magia;
