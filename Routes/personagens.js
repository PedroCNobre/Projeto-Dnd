const express = require('express');
const router = express.Router();
const Personagem = require('../models/personagem');
const Raca = require('../models/raca');
const Classe = require('../models/classe');
const Armadura = require('../models/armadura');
const Arma = require('../models/arma');
const Magia = require('../models/magia');

// GET - Listar todos os personagens
router.get('/', async (req, res) => {
  try {
    const personagens = await Personagem.find().populate('raca classe armadura armas magias');
    res.render('personagens', { title: 'Personagens', personagens: personagens });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET - Formulário para criar um novo personagem
router.get('/new', async (req, res) => {
  try {
    const racas = await Raca.find();
    const classes = await Classe.find();
    const armaduras = await Armadura.find();
    const armas = await Arma.find();
    const magias = await Magia.find();
    res.render('form_personagem', {
      formTitle: 'Criar Personagem',
      item: null,
      formAction: '/personagens',
      racas,
      classes,
      armaduras,
      armas,
      magias
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// POST - Criar um novo personagem
router.post('/', async (req, res) => {
  try {
    const personagem = new Personagem(req.body);
    await personagem.save();
    res.redirect('/personagens');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Formulário para editar um personagem
router.get('/edit/:id', async (req, res) => {
  try {
    const personagem = await Personagem.findById(req.params.id).populate('raca classe armadura armas magias');
    const racas = await Raca.find();
    const classes = await Classe.find();
    const armaduras = await Armadura.find();
    const armas = await Arma.find();
    const magias = await Magia.find();
    res.render('form_personagem', {
      formTitle: 'Editar Personagem',
      item: personagem,
      formAction: `/personagens/${personagem._id}?_method=PUT`,
      racas,
      classes,
      armaduras,
      armas,
      magias
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// PUT - Atualizar um personagem pelo ID
router.put('/:id', async (req, res) => {
  try {
    await Personagem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/personagens');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar um personagem pelo ID
router.delete('/:id', async (req, res) => {
  try {
    await Personagem.findByIdAndDelete(req.params.id);
    res.redirect('/personagens');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
