const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();

// Importe os arquivos de rota
const personagensRoutes = require('../routes/personagens');
const racasRoutes = require('../routes/racas');
const classesRoutes = require('../routes/classes');
const armasRoutes = require('../routes/armas');
const armadurasRoutes = require('../routes/armaduras');
const magiasRoutes = require('../routes/magias');

const app = express();

// Configurar o EJS como mecanismo de modelo
app.set('view engine', 'ejs');

// Definir o diretório de visualizações
app.set('views', path.join(__dirname, '../views'));

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para análise do corpo da requisição como JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para sobrescrever métodos (PUT, DELETE)
app.use(methodOverride('_method'));

// Conexão com o MongoDB usando Mongoose
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000
})
.then(() => {
  console.log('Conexão com o MongoDB bem-sucedida!');

  // Rotas para cada modelo de dados
  app.use('/personagens', personagensRoutes);
  app.use('/racas', racasRoutes);
  app.use('/classes', classesRoutes);
  app.use('/armas', armasRoutes);
  app.use('/armaduras', armadurasRoutes);
  app.use('/magias', magiasRoutes);

  // Rota raiz para renderizar a visualização
  app.get('/', (req, res) => {
    res.render('index'); // Renderiza a visualização 'index.ejs'
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

})
.catch(err => {
  console.error('Erro na conexão com o MongoDB:', err);
});
