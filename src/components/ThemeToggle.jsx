// // {/*Switching between light and dark mode*/}

// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";

// function ThemeToggle() {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <button
//       onClick={toggleTheme}
//       type="button"
//       aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
//       className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//     >
//       <span className="text-lg" >
//         {theme === "light" ? "🌙" : "☀️"}
//       </span>

//       <span>
//         {theme === "light" ? "Dark Mode" : "Light Mode"}
//       </span>
//     </button>
//   );



// }

// export default ThemeToggle;



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