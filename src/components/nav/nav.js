import React from "react";
import styled from "styled-components";
import { ToggleButton } from "../toggleButton/toggleButton.js";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../button/button.js";

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hideOnPokemon = pathname.includes("/pokemon");

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Div>
        {hideOnPokemon ? (
          <Button onClick={handleHomeClick}>Home</Button>
        ) : (
          <ToggleButton>Trocar o tema</ToggleButton>
        )}
      </Div>
      <Img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi.svg?sanitize=true" alt="PokeApi Logo" />
    </div>
  );
};

const Img = styled.img`
  width: 40%;
  display: block;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 3rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 1rem;
  padding: 2rem;
`;

export { Nav };

