import express from 'express';
const router = express.Router();
import Raca from '../models/raca.js';  // Certifique-se de que seu modelo 'Raca' usa 'export default'

// POST - Criar uma nova raça
router.post('/', async (req, res) => {
  const raca = new Raca({
    nome: req.body.nome,
    descricao: req.body.descricao,
    idioma: req.body.idioma,
    modificadorPrincipal: req.body.modificadorPrincipal,
    modificadorSecundario: req.body.modificadorSecundario
  });

  try {
    const novaRaca = await raca.save();
    res.status(201).json(novaRaca);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Listar todas as raças
router.get('/', async (req, res) => {
  try {
    const racas = await Raca.find();
    res.json(racas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma raça pelo ID
router.put('/:id', getRaca, async (req, res) => {
  if (req.body.nome != null) {
    res.raca.nome = req.body.nome;
  }
  // Outros campos a serem atualizados...
  try {
    const updatedRaca = await res.raca.save();
    res.json(updatedRaca);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma raça pelo ID
router.delete('/:id', getRaca, async (req, res) => {
  try {
    await res.raca.remove();
    res.json({ message: 'Deleted This Raca' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para pegar raça pelo ID
async function getRaca(req, res, next) {
  let raca;
  try {
    raca = await Raca.findById(req.params.id);
    if (raca == null) {
      return res.status(404).json({ message: "Can't find raca" });
    }
  } catch(err){
    return res.status(500).json({ message: err.message });
  }
  
  res.raca = raca;
  next();
}

export default router;
