import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CharacterDashboard() {
  const [racas, setRacas] = useState([]);
  const [classes, setClasses] = useState([]);
  const [armas, setArmas] = useState([]);
  const [magias, setMagias] = useState([]);

  useEffect(() => {
    // Buscar raças
    axios.get('http://localhost:3000/api/racas').then(response => {
      setRacas(response.data);
    });

    // Buscar classes
    axios.get('http://localhost:3000/api/classes').then(response => {
      setClasses(response.data);
    });

    // Buscar armas
    axios.get('http://localhost:3000/api/armas').then(response => {
      setArmas(response.data);
    });

    // Buscar magias
    axios.get('http://localhost:3000/api/magias').then(response => {
      setMagias(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard de Personagem</h1>
      <div>
        <h2>Raças</h2>
        <ul>
          {racas.map(raca => (
            <li key={raca._id}>{raca.nome}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Classes</h2>
        <ul>
          {classes.map(classe => (
            <li key={classe._id}>{classe.nome}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Armas</h2>
        <ul>
          {armas.map(arma => (
            <li key={arma._id}>{arma.nome} - {arma.descricao}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Magias</h2>
        <ul>
          {magias.map(magia => (
            <li key={magia._id}>{magia.nome} - {magia.descricao}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDashboard;
