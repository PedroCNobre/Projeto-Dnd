const express = require('express');
const router = express.Router();
const Classe = require('../models/classe');

// POST - Criar uma nova classe
router.post('/', async (req, res) => {
  const classe = new Classe({
    nome: req.body.nome,
    descricao: req.body.descricao,
    qtdAtaques: req.body.qtdAtaques,
    dadosVida: req.body.dadosVida
  });

  try {
    const novaClasse = await classe.save();
    res.status(201).json(novaClasse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Listar todas as classes
router.get('/', async (req, res) => {
  try {
    const classes = await Classe.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma classe pelo ID
router.put('/:id', getClasse, async (req, res) => {
  if (req.body.nome != null) {
    res.classe.nome = req.body.nome;
  }
  // Outros campos a serem atualizados...
  try {
    const updatedClasse = await res.classe.save();
    res.json(updatedClasse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma classe pelo ID
router.delete('/:id', getClasse, async (req, res) => {
  try {
    await res.classe.remove();
    res.json({ message: 'Deleted This Classe' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar classe pelo ID
async function getClasse(req, res, next) {
  let classe;
  try {
    classe = await Classe.findById(req.params.id);
    if (classe == null) {
      return res.status(404).json({ message: 'Cant find classe'});
    }
  } catch(err){
    return res.status(500).json({ message: err.message });
  }
  
  res.classe = classe;
  next();
}

module.exports = router;
