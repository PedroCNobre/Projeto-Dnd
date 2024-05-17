import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import personagensRoutes from '../Routes/personagens.js';
import racasRoutes from '../Routes/racas.js';
import classesRoutes from '../Routes/classes.js';
import armasRoutes from '../Routes/armas.js';
import armadurasRoutes from '../Routes/armaduras.js';
import magiasRoutes from '../Routes/magias.js';

const app = express();

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Conexão com o MongoDB bem-sucedida!'))
.catch(err => console.error('Erro na conexão com o MongoDB:', err));

// Middleware para análise do corpo da requisião como JSON
app.use(express.json());

// Rotas para cada modelo de dados
app.use('/api/personagens', personagensRoutes);
app.use('/api/racas', racasRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/armas', armasRoutes);
app.use('/api/armaduras', armadurasRoutes);
app.use('/api/magias', magiasRoutes);

// Rota raiz para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor do Criador de Personagens D&D rodando!');
});

// Captura de erros 404 para URIs não encontradas
app.use((req, res, next) => {
  res.status(404).send('Desculpe, não encontramos isso!');
});

// Captura de erros 500 para problemas de servidor
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Algo deu errado!');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
