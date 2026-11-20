{/*Switching between light and dark mode*/}
import { useContext } from "react";
import {ThemeContext} from "../context/ThemeContext"

function ThemeToggle(){
const { theme, toggleTheme} = useContext (ThemeContext)
 

return (
     <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
 


}

export default ThemeToggle;