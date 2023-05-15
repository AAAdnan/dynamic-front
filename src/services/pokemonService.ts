import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList() {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon?limit=20`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  }

  export async function fetchPokemonDetails(url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      throw error;
    }
  }