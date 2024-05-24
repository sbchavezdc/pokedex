"use client";
import React, { useState, useEffect } from 'react';
import { fetchPokemonData } from '../../api';
import './index.css';

const PokemonGrid = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const data = await fetchPokemonData();
        setPokemonData(data);
      } catch (error) {
        console.error('Error no hay datos:', error);
      }
    };

    getPokemonData();
  }, []);

  const handlePokeballClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const getStat = (pokemon, statName) => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 'N/A';
  };

  return (
    <div className="grid">
      {pokemonData.length > 0 ? (
        pokemonData.map((pokemon, index) => (
          <div key={index} className="card">
            <div className="card-image">
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name} 
                className="card-image-img" 
              />
            </div>
            <div className="card-content">
                <h2>Nombre: {pokemon.name}</h2>
                <p>Altura: {pokemon.height}</p>
                <p>Peso: {pokemon.weight}</p>
                <h3>Habilidad:</h3>
              <p>
                {pokemon.abilities.map((ability, index) => (
                  <span key={index}>{ability.ability.name}<br/></span>
                ))}
              </p>
            </div>
            <img 
              src='../img/pokebola.png' 
              alt="Pokebola" 
              className="details-button" 
              onMouseOver={(e) => (e.target.style.backgroundColor = '#ff9900')} 
              onMouseOut={(e) => (e.target.style.backgroundColor = '#000000')}
              onClick={() => handlePokeballClick(pokemon)}
            />
          </div>
        ))
      ) : (
        <p>Cargando...</p>
      )}
      {selectedPokemon && (
        <>
          <div className="overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p>Ataque: {getStat(selectedPokemon, 'attack')}</p>
            <p>Defensa: {getStat(selectedPokemon, 'defense')}</p>
            <h3>Movimientos:</h3>
            <p>
              {selectedPokemon.moves.slice(0, 5).map((move, index) => (
                <span key={index}>{move.move.name}<br/></span>
              ))}
            </p>
            <h3>Habilidades:</h3>
            <p>
              {selectedPokemon.abilities.map((ability, index) => (
                <span key={index}>{ability.ability.name}<br/></span>
              ))}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonGrid;