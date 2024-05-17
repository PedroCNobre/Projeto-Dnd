import express from 'express';
const router = express.Router();
import Personagem from '../models/personagem.js'; // Certifique-se de que seu modelo 'Personagem' use 'export default'

// POST - Criar um novo personagem
router.post('/', async (req, res) => {
  try {
    const personagem = new Personagem(req.body);
    const savedPersonagem = await personagem.save();
    res.status(201).json(savedPersonagem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Listar todos os personagens
router.get('/', async (req, res) => {
  try {
    const personagens = await Personagem.find().populate('raca classe armadura armas magias');
    res.json(personagens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar um personagem pelo ID
router.put('/:id', getPersonagem, async (req, res) => {
  if (req.body.nome != null) {
    res.personagem.nome = req.body.nome;
  }
  // Adicione outros campos a serem atualizados aqui
  try {
    const updatedPersonagem = await res.personagem.save();
    res.json(updatedPersonagem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar um personagem pelo ID
router.delete('/:id', getPersonagem, async (req, res) => {
  try {
    await res.personagem.remove();
    res.json({ message: 'Deleted This Personagem' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar personagem pelo ID
async function getPersonagem(req, res, next) {
  let personagem;
  try {
    personagem = await Personagem.findById(req.params.id);
    if (personagem == null) {
      return res.status(404).json({ message: "Can't find personagem" });
    }
  } catch(err){
    return res.status(500).json({ message: err.message });
  }
  
  res.personagem = personagem;
  next();
}

export default router;