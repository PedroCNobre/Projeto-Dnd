import express from 'express';
const router = express.Router();
import Arma from '../models/arma.js';  // Garanta que seu modelo 'Arma' use 'export default'

// POST - Criar uma nova arma
router.post('/', async (req, res) => {
  const arma = new Arma({
    nome: req.body.nome,
    descricao: req.body.descricao,
    tipoDano: req.body.tipoDano,
    dano: req.body.dano
  });

  try {
    const novaArma = await arma.save();
    res.status(201).json(novaArma);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Listar todas as armas
router.get('/', async (req, res) => {
  try {
    const armas = await Arma.find();
    res.json(armas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma arma pelo ID
router.put('/:id', getArma, async (req, res) => {
  if (req.body.nome != null) {
    res.arma.nome = req.body.nome;
  }
  // Adicione outros campos a serem atualizados aqui
  try {
    const updatedArma = await res.arma.save();
    res.json(updatedArma);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/// DELETE - Deletar uma arma pelo ID
router.delete('/:id', getArma, async (req, res) => {
  try {
    await res.arma.remove();
    res.json({ message: "Deleted This Arma" });
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
      return res.status(404).json({ message: "Can't find arma" });
    }
  } catch(err){
    return res.status(500).json({ message: err.message });
  }
  
  res.arma = arma;
  next();
}
export default router;
