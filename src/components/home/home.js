import React, { useContext } from "react"
import { Pokedex } from "../pokedex/pokedex.js"
import { styled } from "styled-components"
import { Nav } from "../nav/nav.js"
import { ThemeContext } from "../context/themeContext.js";

const Home =()=>{

    const { theme } = useContext(ThemeContext)
    return(
        <Div theme= {theme}>
            <Nav />
            <Pokedex />
        </Div>
    )
}

const Div = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    min-height:100vh;
`
export{ Home }