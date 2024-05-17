import mongoose from 'mongoose';
const racaSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  idioma: String,
  modificadorPrincipal: Number,
  modificadorSecundario: Number
});
const Raca = mongoose.model('Raca', racaSchema);
export default Raca;
