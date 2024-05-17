import express from 'express';
const router = express.Router();
import Magia from '../models/magia.js'; // Garanta que seu modelo 'Magia' use 'export default'

// POST - Criar uma nova magia
router.post('/', async (req, res) => {
  const magia = new Magia({
    nome: req.body.nome,
    descricao: req.body.descricao,
    elemento: req.body.elemento,
    escolaMagia: req.body.escolaMagia,
    dano: req.body.dano
  });

  try {
    const novaMagia = await magia.save();
    res.status(201).json(novaMagia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Listar todas as magias
router.get('/', async (req, res) => {
  try {
    const magias = await Magia.find();
    res.json(magias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma magia pelo ID
router.put('/:id', getMagia, async (req, res) => {
  if (req.body.nome != null) {
    res.magia.nome = req.body.nome;
  }
  // Outros campos a serem atualizados...
  try {
    const updatedMagia = await res.magia.save();
    res.json(updatedMagia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma magia pelo ID
router.delete('/:id', getMagia, async (req, res) => {
  try {
    await res.magia.remove();
    res.json({ message: 'Deleted This Magia' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar magia pelo ID
async function getMagia(req, res, next) {
  let magia;
  try {
    magia = await Magia.findById(req.params.id);
    if (magia == null) {
      return res.status(404).json({ message: "Can't find magia" });
    }
  } catch(err){
    return res.status(500).json({ message: err.message });
  }
  
  res.magia = magia;
  next();
}

export default router;
