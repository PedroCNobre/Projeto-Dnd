const express = require('express');
const router = express.Router();
const Arma = require('../models/arma');

// GET - Listar todas as armas
router.get('/', async (req, res) => {
  try {
    const armas = await Arma.find();
    res.render('list', { title: 'Armas', items: armas, itemUrl: '/armas' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Formulário para criar uma nova arma
router.get('/new', (req, res) => {
  res.render('form', { formTitle: 'Criar Arma', item: null, formAction: '/armas' });
});

// POST - Criar uma nova arma
router.post('/', async (req, res) => {
  try {
    const arma = new Arma(req.body);
    await arma.save();
    res.redirect('/armas');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Detalhes da arma
router.get('/:id', async (req, res) => {
  try {
    const arma = await Arma.findById(req.params.id);
    res.render('detail', { title: 'Arma', item: arma, itemUrl: '/armas' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Formulário para editar uma arma
router.get('/edit/:id', async (req, res) => {
  try {
    const arma = await Arma.findById(req.params.id);
    res.render('form', { formTitle: 'Editar Arma', item: arma, formAction: `/armas/${arma._id}?_method=PUT` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma arma pelo ID
router.put('/:id', getArma, async (req, res) => {
  if (req.body.nome != null) {
    res.arma.nome = req.body.nome;
  }
  // Outros campos a serem atualizados...
  try {
    const updatedArma = await res.arma.save();
    res.redirect(`/armas/${updatedArma._id}`);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma arma pelo ID
router.delete('/:id', getArma, async (req, res) => {
  try {
    await res.arma.remove();
    res.redirect('/armas');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar arma pelo ID
async function getArma(req, res, next) {
  let arma;
  try {
    arma = await Arma.findById(req.params.id);
    if (arma == null) {
      return res.status(404).json({ message: 'Não foi possível encontrar a arma' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
  res.arma = arma;
  next();
}

module.exports = router;
