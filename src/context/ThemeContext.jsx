/* eslint-disable react-refresh/only-export-components */
{/*hold the current theme , it will help in switching between light and dark mode ensuring availability throughout the aoolication*/}

import { createContext, useState } from "react";

// context to share the theme across components
export const ThemeContext = createContext();

//  provider to manage the theme
export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState("light");

  // Function to switch between light and dark mode
  function toggleTheme() {
    setTheme(currentTheme =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


