import mongoose from 'mongoose';

const armaduraSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  tipoArmadura: String,
  classeDefesa: Number
});

const Armadura = mongoose.model('Armadura', armaduraSchema);

export default Armadura;
