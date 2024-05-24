import axios from 'axios';

export const getPokemonList = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  return response.data.results;
};


export const fetchPokemonCategories = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching pokemon categories:', error);
    throw error;
  }
};



export const fetchPokemonData = async () => {
  try {
    const pokemonPromises = [];
    for (let i = 1; i <= 16; i++) {
      pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
    }
    const responses = await Promise.all(pokemonPromises);
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw error;
  }
};




