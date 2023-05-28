import { createGlobalStyle } from "styled-components"
import { AppRoutes } from './pages/routes.js';
import { ThemeProvider } from "./components/context/themeContext.js";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <GlobalStyle></GlobalStyle>
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  *{
    list-style: none;
    margin:0;
    padding:0;
    font-size:62.5%;
    box-sizing: border-box;
    list-style:none;
    text-transform: capitalize;
  }
`
export default App;
