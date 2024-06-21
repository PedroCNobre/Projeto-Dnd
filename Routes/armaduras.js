const express = require('express');
const router = express.Router();
const Armadura = require('../models/armadura');

// GET - Listar todas as armaduras
router.get('/', async (req, res) => {
  try {
    const armaduras = await Armadura.find();
    res.render('armaduras', { title: 'Armaduras', armaduras: armaduras });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET - Formulário para criar uma nova armadura
router.get('/new', (req, res) => {
  res.render('form', { formTitle: 'Criar Armadura', item: null, formAction: '/armaduras', itemType: 'armadura' });
});

// POST - Criar uma nova armadura
router.post('/', async (req, res) => {
  try {
    const armadura = new Armadura(req.body);
    await armadura.save();
    res.redirect('/armaduras');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Detalhes da armadura
router.get('/:id', async (req, res) => {
  try {
    const armadura = await Armadura.findById(req.params.id);
    res.render('detail', { title: 'Armadura', item: armadura, itemUrl: '/armaduras' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Formulário para editar uma armadura
router.get('/edit/:id', async (req, res) => {
  try {
    const armadura = await Armadura.findById(req.params.id);
    res.render('form', { formTitle: 'Editar Armadura', item: armadura, formAction: `/armaduras/${armadura._id}?_method=PUT`, itemType: 'armadura' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma armadura pelo ID
router.put('/:id', getArmadura, async (req, res) => {
  if (req.body.nome != null) {
    res.armadura.nome = req.body.nome;
  }
  if (req.body.descricao != null) {
    res.armadura.descricao = req.body.descricao;
  }
  if (req.body.defesa != null) {
    res.armadura.defesa = req.body.defesa;
  }
  if (req.body.tipo != null) {
    res.armadura.tipo = req.body.tipo;
  }
  try {
    const updatedArmadura = await res.armadura.save();
    res.redirect(`/armaduras/${updatedArmadura._id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma armadura pelo ID
router.delete('/:id', getArmadura, async (req, res) => {
  try {
    await res.armadura.remove();
    res.redirect('/armaduras');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar armadura pelo ID
async function getArmadura(req, res, next) {
  let armadura;
  try {
    armadura = await Armadura.findById(req.params.id);
    if (armadura == null) {
      return res.status(404).json({ message: 'Não foi possível encontrar a armadura' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.armadura = armadura;
  next();
}

module.exports = router;
