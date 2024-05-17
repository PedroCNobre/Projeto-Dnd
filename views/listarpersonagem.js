import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListarPersonagens() {
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/personagens').then(response => {
      setPersonagens(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Personagens</h1>
      <ul>
        {personagens.map(personagem => (
          <li key={personagem._id}>{personagem.nome}</li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/criar-personagem'}>Criar Novo Personagem</button>
    </div>
  );
}

export default ListarPersonagens;
