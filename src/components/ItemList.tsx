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
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="App">
      <header>
        <h1>Pokemon List</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      {/* Render the list of Pokemon items */}
      <ul className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            <div>
              <h3>{pokemon.name}</h3>
              <p>{pokemon.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
