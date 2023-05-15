import React, { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../services/pokemonService';
import PokemonItem from './PokemonItem';
import styled from 'styled-components';
import AddPokemonForm from './AddPokemonForm';


interface Pokemon {
  id: number;
  name: string;
  description: string;
  image: string;
  [key: string]: number | string | string[];
}

const ItemList: React.FC = (): JSX.Element => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAttribute, setSortAttribute] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    async function fetchData() {
      try {
        const results = await fetchPokemonList();

        const pokemonDataPromises = results.map(async (result: any) => {
          const pokemonDetails = await fetchPokemonDetails(result.url);
          const { id, name } = pokemonDetails;
          const description = pokemonDetails.moves.map((move: any) => move.move.name).slice(0,3);
          const image = pokemonDetails.sprites.front_default;

          return { id, name, description, image };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (attribute: string) => {
    if (attribute === sortAttribute) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortAttribute(attribute);
      setSortDirection('asc');
    }
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPokemonList = filteredPokemonList.sort((a, b) => {
    if (a[sortAttribute] < b[sortAttribute]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortAttribute] > b[sortAttribute]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleAddPokemon = (pokemon: Pokemon) => {
    setPokemonList([...pokemonList, pokemon]);
  };

  return (
    <div>
    <header>
      <h1>Pokemon List</h1>
      <input type="text" placeholder="Search by name" onChange={handleSearch} />
    </header>
    <section>
      <button onClick={() => handleSort('name')}>Sort by Name</button>
      <button onClick={() => handleSort('id')}>Sort by ID</button>
    </section>
    <PokemonList>
        {sortedPokemonList.map((pokemon) => (
          <PokemonItem key={pokemon.id} pokemon={pokemon} />
        ))}
    </PokemonList>
    <AddPokemonForm onAddPokemon={handleAddPokemon} />
  </div>
  );
};

export default ItemList;

const PokemonList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;