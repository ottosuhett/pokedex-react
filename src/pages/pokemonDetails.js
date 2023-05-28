import React from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../components/pokemon/pokemon.js";

const PokemonDetails = () => {
    const { id } = useParams();
  
    return (
      <Pokemon id={id} />
    );
}

export { PokemonDetails }