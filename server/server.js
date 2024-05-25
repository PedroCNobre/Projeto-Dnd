require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Importe o módulo 'path'

// Importe os arquivos de rota
const personagensRoutes = require('../Routes/personagens');
const racasRoutes = require('../Routes/racas');
const classesRoutes = require('../Routes/classes');
const armasRoutes = require('../Routes/armas');
const armadurasRoutes = require('../Routes/armaduras');
const magiasRoutes = require('../Routes/magias');

const app = express();

// Configurar o EJS como mecanismo de modelo
app.set('view engine', 'ejs');

// Definir o diretório de visualizações
app.set('views', path.join(__dirname, '../views'));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Conexão com o MongoDB bem-sucedida!'))
.catch(err => console.error('Erro na conexão com o MongoDB:', err));

// Middleware para análise do corpo da requisição como JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas para cada modelo de dados
app.use('/api/personagens', personagensRoutes);
app.use('/api/racas', racasRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/armas', armasRoutes);
app.use('/api/armaduras', armadurasRoutes);
app.use('/api/magias', magiasRoutes);

// Rota raiz para renderizar a visualização
app.get('/', (req, res) => {
  res.render('personagem'); // Renderiza a visualização 'personagem.ejs'
});

// Rota para verificar se o servidor está funcionando
app.get('/api', (req, res) => {
  res.send('API do Criador de Personagens D&D rodando!');
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
