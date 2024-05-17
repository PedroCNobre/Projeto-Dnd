import express from 'express';
const router = express.Router();
import Armadura from '../models/armadura.js'; // Certifique-se de exportar Armadura usando 'export default' no modelo correspondente

// POST - Criar uma nova armadura
router.post('/', async (req, res) => {
  const armadura = new Armadura({
    nome: req.body.nome,
    descricao: req.body.descricao,
    tipoArmadura: req.body.tipoArmadura,
    classeDefesa: req.body.classeDefesa
  });

  try {
    const novaArmadura = await armadura.save();
    res.status(201).json(novaArmadura);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - Listar todas as armaduras
router.get('/', async (req, res) => {
  try {
    const armaduras = await Armadura.find();
    res.json(armaduras);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Atualizar uma armadura pelo ID
router.put('/:id', getArmadura, async (req, res) => {
  if (req.body.nome != null) {
    res.armadura.nome = req.body.nome;
  }
  // Adicione outros campos a serem atualizados aqui
  try {
    const updatedArmadura = await res.armadura.save();
    res.json(updatedArmadura);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Deletar uma armadura pelo ID
router.delete('/:id', getArmadura, async (req, res) => {
  try {
    await res.armadura.remove();
    res.json({ message: 'Deleted This Armadura' });
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
      return res.status(404).json({ message: 'Cant find armadura' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
  res.armadura = armadura;
  next();
}

export default router;
