import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { Nav } from "../nav/nav.js"
import { ThemeContext } from "../context/themeContext.js";


const Pokemon = (props) => {
  const [details, setDetails] = useState({
    name: "",
    moves: [],
    abilities: [],
    type: ""
  });
  const { theme } = useContext(ThemeContext)

  async function getPokemonDetails(id) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  async function getAbilityDetails(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await getPokemonDetails(props.id);
      const abilityPromises = pokemonData.abilities.map((ability) =>
        getAbilityDetails(ability.ability.url)
      );
      const abilityDetails = await Promise.all(abilityPromises);

      const updatedAbilities = pokemonData.abilities.map((ability, index) => ({
        ability: {
          ...ability.ability,
          effect_entries: abilityDetails[index].effect_entries,
          flavor_text_entries: abilityDetails[index].flavor_text_entries
        }
      }));

      setDetails({
        name: pokemonData.name,
        moves: pokemonData.moves,
        abilities: updatedAbilities,
        type: pokemonData.types[0].type.name
      });
    };
    fetchData();
  }, [props.id]);

  return (
    <Div theme={ theme }>
      <Nav /> 
      <Img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        alt="pokemon"
      />
      <H1>{details.name}</H1>
      <H2>Moves</H2>
      <P>
        {details.moves.reduce((accumulator, move) => accumulator === "" ? move.move.name : `${accumulator},${move.move.name} `, "")}
      </P>
      <H2>Abilities</H2>
      <Ul>
        {details.abilities.map((ability) => (
          <li key={ability.ability.name}>
            <H3>Name</H3> 
            <P>{ability.ability.name}</P><br />
            <H3>Effect</H3>{" "}
            <P>{ability.ability.effect_entries.find(entry => entry.language.name === 'en').effect}</P><br />
            <H3>Text</H3>{" "}
            <P>{ability.ability.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
            )?.flavor_text}</P><br />
          </li>
        ))}
      </Ul>
      <H2>Type</H2>
      <P>{details.type}</P>
    </Div>
  );
};

const Ul = styled.ul`
 font-size:2rem;
 text-align:center;
 margin:1rem;

`
const Div = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:5rem;
    font-size:2rem;
    background-color: ${props => props.theme.backgroundColor};
    color:${props => props.theme.color};
    border: 3px solid red;
    margin:1rem;
    height:auto;
`
const H2 = styled.h2`
    font-size: 2.5rem;
    padding:1.5rem;
    
`
const H1 = styled.h1`
    font-size: 3rem;
    
`
const H3 =styled.h3`
    font-size:1.5rem;
    margin:1rem;
    
`
const Img = styled.img`
    width:40%;
    
`
const P = styled.p`
    font-size: 2rem;
`

export { Pokemon };
