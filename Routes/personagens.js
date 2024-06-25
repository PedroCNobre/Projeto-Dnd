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
      racas: racas,
      classes: classes,
      armaduras: armaduras,
      armas: armas,
      magias: magias
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
    const personagem = await Personagem.findById(req.params.id);
    const racas = await Raca.find();
    const classes = await Classe.find();
    const armaduras = await Armadura.find();
    const armas = await Arma.find();
    const magias = await Magia.find();
    res.render('form_personagem', {
      formTitle: 'Editar Personagem',
      item: personagem,
      formAction: `/personagens/${personagem._id}?_method=PUT`,
      racas: racas,
      classes: classes,
      armaduras: armaduras,
      armas: armas,
      magias: magias
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar um personagem pelo ID
router.put('/:id', getPersonagem, async (req, res) => {
  if (req.body.nome != null) {
    res.personagem.nome = req.body.nome;
  }
  if (req.body.raca != null) {
    res.personagem.raca = req.body.raca;
  }
  if (req.body.classe != null) {
    res.personagem.classe = req.body.classe;
  }
  if (req.body.nivel != null) {
    res.personagem.nivel = req.body.nivel;
  }
  if (req.body.pontosVida != null) {
    res.personagem.pontosVida = req.body.pontosVida;
  }
  if (req.body.armadura != null) {
    res.personagem.armadura = req.body.armadura;
  }
  if (req.body.armas != null) {
    res.personagem.armas = req.body.armas;
  }
  if (req.body.magias != null) {
    res.personagem.magias = req.body.magias;
  }
  try {
    const updatedPersonagem = await res.personagem.save();
    res.redirect('/personagens');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar um personagem pelo ID
router.delete('/:id', getPersonagem, async (req, res) => {
  try {
    await Personagem.deleteOne({ _id: res.personagem._id });
    res.redirect('/personagens');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar personagem pelo ID
async function getPersonagem(req, res, next) {
  let personagem;
  try {
    personagem = await Personagem.findById(req.params.id);
    if (personagem == null) {
      return res.status(404).json({ message: 'Não foi possível encontrar o personagem' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.personagem = personagem;
  next();
}

module.exports = router;
