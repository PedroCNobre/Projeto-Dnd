import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CriarPersonagem() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [armas, setArmas] = useState([]);
  const [magias, setMagias] = useState([]);
  const [racas, setRacas] = useState([]);
  const [selectedArmas, setSelectedArmas] = useState([]);
  const [selectedMagias, setSelectedMagias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/racas').then(response => {
      setRacas(response.data);
    });
    axios.get('http://localhost:3000/api/armas').then(response => {
      setArmas(response.data);
    });
    axios.get('http://localhost:3000/api/magias').then(response => {
      setMagias(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const novoPersonagem = {
      nome,
      raca,
      armas: selectedArmas,
      magias: selectedMagias
    };
    axios.post('http://localhost:3000/api/personagens', novoPersonagem)
         .then(res => console.log(res.data));
  };

  return (
    <div>
      <h1>Criar Personagem</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div>
          <label>Raça:</label>
          <select value={raca} onChange={e => setRaca(e.target.value)}>
            {racas.map(raca => (
              <option key={raca._id} value={raca.nome}>
                {raca.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Armas:</label>
          <select multiple value={selectedArmas} onChange={e => setSelectedArmas([...e.target.selectedOptions].map(o => o.value))}>
            {armas.map(arma => (
              <option key={arma._id} value={arma._id}>
                {arma.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Magias:</label>
          <select multiple value={selectedMagias} onChange={e => setSelectedMagias([...e.target.selectedOptions].map(o => o.value))}>
            {magias.map(magia => (
              <option key={magia._id} value={magia._id}>
                {magia.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Criar Personagem</button>
      </form>
    </div>
  );
}

export default CriarPersonagem;
