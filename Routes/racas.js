const express = require('express');
const router = express.Router();
const Raca = require('../models/raca');

// Rota para listar raças
router.get('/', async (req, res) => {
  try {
    const racas = await Raca.find();
    res.render('racas', { title: 'Raças', racas: racas });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
