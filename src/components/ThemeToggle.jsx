// // {/*Switching between light and dark mode*/}
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border px-2 py-2 text-sm font-semibold shadow-sm transition duration-300 focus:outline-none  ${
        theme === "light"
          ? "border-slate-300 bg-slate-900 text-white hover:bg-slate-800"
          : "border-slate-600 bg-slate-100 text-slate-900 hover:bg-white"
      }`}
    >
      <span className="text-lg">
        {theme === "light" ? "🌙" : "☀️"}
      </span>

      <span>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}

export default ThemeToggle;