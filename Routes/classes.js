const express = require('express');
const router = express.Router();
const Classe = require('../models/classe');

// GET - Listar todas as classes
router.get('/', async (req, res) => {
  try {
    const classes = await Classe.find();
    res.render('classes', { title: 'Classes', classes: classes });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET - Formulário para criar uma nova classe
router.get('/new', (req, res) => {
  res.render('form', {
    formTitle: 'Criar Classe',
    item: null,
    formAction: '/classes',
    itemType: 'classe'
  });
});

// POST - Criar uma nova classe
router.post('/', async (req, res) => {
  try {
    const classe = new Classe(req.body);
    await classe.save();
    res.redirect('/classes');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Detalhes da classe
router.get('/:id', async (req, res) => {
  try {
    const classe = await Classe.findById(req.params.id);
    res.render('detail', { title: 'Classe', item: classe, itemUrl: '/classes' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Formulário para editar uma classe
router.get('/edit/:id', async (req, res) => {
  try {
    const classe = await Classe.findById(req.params.id);
    res.render('form', {
      formTitle: 'Editar Classe',
      item: classe,
      formAction: `/classes/${classe._id}?_method=PUT`,
      itemType: 'classe'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma classe pelo ID
router.put('/:id', getClasse, async (req, res) => {
  if (req.body.nome != null) {
    res.classe.nome = req.body.nome;
  }
  if (req.body.descricao != null) {
    res.classe.descricao = req.body.descricao;
  }
  try {
    const updatedClasse = await res.classe.save();
    res.redirect('/classes');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma classe pelo ID
router.delete('/:id', getClasse, async (req, res) => {
  try {
    await Classe.deleteOne({ _id: res.classe._id });
    res.redirect('/classes');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar classe pelo ID
async function getClasse(req, res, next) {
  let classe;
  try {
    classe = await Classe.findById(req.params.id);
    if (classe == null) {
      return res.status(404).json({ message: 'Não foi possível encontrar a classe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.classe = classe;
  next();
}

module.exports = router;
