import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; 

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition duration-200 ${
    isActive
      ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
      : "text-slate-300 hover:bg-white/10 hover:text-white"
  }`;

function SideBar() {
  return (
    <aside className="sidebar flex flex-col justify-between h-screen">
      {/* Top Section */}
      <div>
        <div className="sidebar-brand mb-6">
          <div className="text-xl font-bold tracking-wide">DukaMart</div>
        </div>

        <nav className="sidebar-links flex flex-col gap-2">
          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/products" end className={linkClass}>
            Products
          </NavLink>

          <NavLink to="/products/new" end className={linkClass}>
            Add Product
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="pt-4 border-t border-white/10">
        <ThemeToggle />
      </div>
    </aside>
  );
}

export default SideBar;