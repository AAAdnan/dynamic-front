import React, { useState } from 'react';
import { Pokemon } from '../types'
import styled from 'styled-components';

interface AddPokemonFormProps {
  onAddPokemon: (pokemon: Pokemon) => void;
}

const AddPokemonForm: React.FC<AddPokemonFormProps> = ({ onAddPokemon }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Create a new Pokemon object
    const newPokemon: Pokemon = {
      id: Math.random(), // 
      name,
      description,
      image,
    };

    // Call the `onAddPokemon` prop function to pass the new Pokemon data to the parent component
    onAddPokemon(newPokemon);

    setName('');
    setDescription('');
    setImage('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add New Pokemon</h2>
      <FormGroup>
        <label htmlFor="name">Name:</label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="description">Description:</label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="image">Image URL:</label>
        <Input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
      </FormGroup>
      <Button type="submit">Add Pokemon</Button>
    </Form>
  );
};

export default AddPokemonForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;