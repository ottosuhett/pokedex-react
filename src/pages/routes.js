import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./homePage.js"
import { PokemonDetails } from "./pokemonDetails.js"


const AppRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/pokemon/:id' element={<PokemonDetails />}/>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }