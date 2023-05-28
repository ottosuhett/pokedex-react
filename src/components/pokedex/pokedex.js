import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Button } from "../button/button.js"
import { Link } from "react-router-dom";


const Pokedex = () => {
  const [pokedex, setPokedex] = useState({
    pokemons: [],
    offset: 10
  });

  async function getPokemons(limit, offset) {
    const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  async function getPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const fetchData = async () => {
      const pokedexData = await getPokemons(10, 0);
      const pokemonDetailsPromises = pokedexData.results.map((pokemon) =>
        getPokemonDetails(pokemon.url)
      );
      const pokemonDetails = await Promise.all(pokemonDetailsPromises);
      setPokedex({
        pokemons: pokemonDetails,
        offset: 10
      });
    };
    fetchData();
  }, []);

  const PokemonList = (props) => {
    if (props.pokemons.length === 0) {
      return null; 
    }

    return (
      <Ul>
        {props.pokemons.map((pkm, index) => (
          <Li key={index}>
            <StyledLink to={`/pokemon/${pkm.id}`}>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkm.id}.png`} alt="pokemon" />
              <H1>{pkm.name}</H1>
            </StyledLink>
          </Li>
        ))}
      </Ul>
    );
  };

  const fetchMorePokemons = async () => {
    const pokedexData = await getPokemons(10, pokedex.offset);
    const pokemonDetailsPromises = pokedexData.results.map((pokemon) =>
      getPokemonDetails(pokemon.url)
    );
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    setPokedex((prevState) => ({
      pokemons: [...prevState.pokemons, ...pokemonDetails],
      offset: prevState.offset + 10
    }));
  };

  return (
    <>
      <Section>
        {pokedex.pokemons.length > 0 && <PokemonList pokemons={pokedex.pokemons} />}
      </Section>
      <Button onClick={fetchMorePokemons}>More Pokemon</Button>
    </>
  );
};

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 5rem;
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Li = styled.li`
  text-align: center;
  border-style: solid;
  border-radius: 0.5rem;
  margin: 0.5rem;
  background-color: #CDDEFF;
  padding: 1rem;
`;

const H1 = styled.h1`
  font-size: 2rem;
  text-transform: capitalize;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  


`;
export { Pokedex };
