import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  "sidebar-link" + (isActive ? " active" : "");

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div>
          <div className="sidebar-title">DukaMart</div>
          <div className="sidebar-sub">Admin Portal</div>
        </div>
      </div>

      <nav className="sidebar-links">
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
    </aside>
  );
}

export default SideBar;
