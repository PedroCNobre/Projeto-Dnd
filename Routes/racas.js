const express = require('express');
const router = express.Router();
const Raca = require('../models/raca');

// GET - Listar todas as raças
router.get('/', async (req, res) => {
  try {
    const racas = await Raca.find();
    res.render('racas', { title: 'Raças', racas: racas });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET - Formulário para criar uma nova raça
router.get('/new', (req, res) => {
  res.render('form', { formTitle: 'Criar Raça', item: null, formAction: '/racas', itemType: 'raca' });
});

// POST - Criar uma nova raça
router.post('/', async (req, res) => {
  try {
    const raca = new Raca(req.body);
    await raca.save();
    res.redirect('/racas');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Detalhes da raça
router.get('/:id', async (req, res) => {
  try {
    const raca = await Raca.findById(req.params.id);
    res.render('detail', { title: 'Raça', item: raca, itemUrl: '/racas' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Formulário para editar uma raça
router.get('/edit/:id', async (req, res) => {
  try {
    const raca = await Raca.findById(req.params.id);
    res.render('form', { formTitle: 'Editar Raça', item: raca, formAction: `/racas/${raca._id}?_method=PUT`, itemType: 'raca' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma raça pelo ID
router.put('/:id', getRaca, async (req, res) => {
  if (req.body.nome != null) {
    res.raca.nome = req.body.nome;
  }
  if (req.body.descricao != null) {
    res.raca.descricao = req.body.descricao;
  }
  if (req.body.forca != null) {
    res.raca.forca = req.body.forca;
  }
  if (req.body.destreza != null) {
    res.raca.destreza = req.body.destreza;
  }
  if (req.body.constituicao != null) {
    res.raca.constituicao = req.body.constituicao;
  }
  if (req.body.inteligencia != null) {
    res.raca.inteligencia = req.body.inteligencia;
  }
  if (req.body.sabedoria != null) {
    res.raca.sabedoria = req.body.sabedoria;
  }
  if (req.body.carisma != null) {
    res.raca.carisma = req.body.carisma;
  }
  try {
    const updatedRaca = await res.raca.save();
    res.redirect(`/racas/${updatedRaca._id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma raça pelo ID
router.delete('/:id', getRaca, async (req, res) => {
  try {
    await res.raca.remove();
    res.redirect('/racas');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar raça pelo ID
async function getRaca(req, res, next) {
  let raca;
  try {
    raca = await Raca.findById(req.params.id);
    if (raca == null) {
      return res.status(404).json({ message: 'Não foi possível encontrar a raça' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.raca = raca;
  next();
}

module.exports = router;
