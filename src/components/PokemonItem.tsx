import React from 'react';
import styled from 'styled-components';
import { Pokemon } from '../types'

interface PokemonItemProps {
  pokemon: Pokemon;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }): React.ReactElement => {
    return (
      <Container>
        <Image src={pokemon.image} alt={pokemon.name} />
        <Name>{pokemon.name}</Name>
        <Description>
          {pokemon.description}
        </Description>
      </Container>
    );
  };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const Name = styled.h3`
  margin-top: 0.5rem;
`;

const Description = styled.p`
  margin-top: 0.5rem;
`;

export default PokemonItem;

export {};