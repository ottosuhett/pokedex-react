import React,{ useContext } from "react";
import { ThemeContext, themes } from "../context/themeContext.js";
import { Button } from "../button/button";

const ToggleButton = () =>{
    const { theme,setTheme } = useContext(ThemeContext)
    return(
        <div>
            <Button onClick={()=>{setTheme(theme === themes.light ? themes.dark: themes.light)}}>Change Theme</Button>
        </div>
    )
}


export { ToggleButton }