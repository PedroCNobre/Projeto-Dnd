import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa CSS global, se necessário
import App from './App'; // Importa o componente App
import reportWebVitals from './reportWebVitals'; // Uma função utilitária para medir performance (opcional)

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import listarPersonagens from '../views/listarpersonagem.js';
import Personagem from '../views/personagemersonagem';
import Opcoes from '../views/opcoes.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/personagem" component={Personagem} />
        <Route path="/opcoes" component={Opcoes} />
        <Route path="/" component={ListarPersonagens} />
      </Switch>
    </Router>
  );
}


// O código abaixo renderiza o componente App no elemento root do seu HTML.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Isto é opcional: pode ser usado para medir e relatar a performance da aplicação
reportWebVitals();
