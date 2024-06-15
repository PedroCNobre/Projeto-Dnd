const express = require('express');
const router = express.Router();
const Personagem = require('../models/personagem');

// Rota para listar personagens
router.get('/', async (req, res) => {
  try {
    const personagens = await Personagem.find();
    res.render('personagens', { title: 'Personagens', personagens: personagens });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
