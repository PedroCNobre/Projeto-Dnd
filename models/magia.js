const mongoose = require('mongoose');

const magiaSchema = new mongoose.Schema({
  nome: String,
  descricao: String ,
    elemento: String ,
    escolaMagia: String ,
    dano: Number
});

module.exports = mongoose.model('magia', magiaSchema);
