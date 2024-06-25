const express = require('express');
const router = express.Router();
const Magia = require('../models/magia');

// GET - Listar todas as magias
router.get('/', async (req, res) => {
  try {
    const magias = await Magia.find();
    res.render('magias', { title: 'Magias', magias: magias });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET - Formulário para criar uma nova magia
router.get('/new', (req, res) => {
  res.render('form', {
    formTitle: 'Criar Magia',
    item: null,
    formAction: '/magias',
    itemType: 'magia'
  });
});

// POST - Criar uma nova magia
router.post('/', async (req, res) => {
  try {
    const magia = new Magia(req.body);
    await magia.save();
    res.redirect('/magias');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Detalhes da magia
router.get('/:id', async (req, res) => {
  try {
    const magia = await Magia.findById(req.params.id);
    res.render('detail', { title: 'Magia', item: magia, itemUrl: '/magias' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Formulário para editar uma magia
router.get('/edit/:id', async (req, res) => {
  try {
    const magia = await Magia.findById(req.params.id);
    res.render('form', {
      formTitle: 'Editar Magia',
      item: magia,
      formAction: `/magias/${magia._id}?_method=PUT`,
      itemType: 'magia'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma magia pelo ID
router.put('/:id', getMagia, async (req, res) => {
  if (req.body.nome != null) {
    res.magia.nome = req.body.nome;
  }
  if (req.body.descricao != null) {
    res.magia.descricao = req.body.descricao;
  }
  if (req.body.nivel != null) {
    res.magia.nivel = req.body.nivel;
  }
  if (req.body.escola != null) {
    res.magia.escola = req.body.escola;
  }
  try {
    const updatedMagia = await res.magia.save();
    res.redirect('/magias');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma magia pelo ID
router.delete('/:id', getMagia, async (req, res) => {
  try {
    await Magia.deleteOne({ _id: res.magia._id });
    res.redirect('/magias');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar magia pelo ID
async function getMagia(req, res, next) {
  let magia;
  try {
    magia = await Magia.findById(req.params.id);
    if (magia == null) {
      return res.status(404).json({ message: 'Não foi possível encontrar a magia' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.magia = magia;
  next();
}

module.exports = router;
