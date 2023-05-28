import { createContext, useState } from "react"


export const themes = {
    light:{
        backgroundColor: "#EB5353",
        color:"#000000"
        
        
    },
    dark:{
        backgroundColor: "#070A52",
        color:"#FFFFFF"
        
    }

}
 export const ThemeContext = createContext({ })
 
 export const ThemeProvider = (props) =>{
    const [theme, setTheme] = useState(themes.light);
    return(
        <ThemeContext.Provider value = {{ theme, setTheme  }}>
            {props.children}
        </ThemeContext.Provider>
    )
 }