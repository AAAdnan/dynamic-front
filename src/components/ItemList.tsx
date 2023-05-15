import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ItemList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const { results } = response.data;

        console.log(results)

        const pokemonDataPromises = results.map((result: any) => axios.get(result.url));

        console.log(pokemonDataPromises)
        const pokemonDataResponses = await Promise.all(pokemonDataPromises);

        console.log(pokemonDataResponses)
        const pokemonData = pokemonDataResponses.map((response: any) => response.data);

        console.log(pokemonData)

        const formattedPokemonList: Pokemon[] = pokemonData.map((pokemon: any) => ({
          id: pokemon.id,
          name: pokemon.name,
          description: pokemon.moves.slice(0,3).map((element: any) => element.move.name),
          image: pokemon.sprites.front_default,
        }));

        setPokemonList(formattedPokemonList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {pokemonList.map((pokemon: Pokemon) => (
        <div key={pokemon.id}>
          <h3>{pokemon.name}</h3>
          <p>{pokemon.description}</p>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;