import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  "sidebar-link" + (isActive ? " active" : "");

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">D</div>
        <div>
          <div className="sidebar-title">DukaMart</div>
          <div className="sidebar-sub">Admin Portal</div>
        </div>
      </div>

      <nav className="sidebar-links">
        <NavLink to="/" end className={linkClass}>
          <span className="sidebar-icon">▦</span>
          Dashboard
        </NavLink>

        <NavLink to="/products" end className={linkClass}>
          <span className="sidebar-icon">▤</span>
          Products
        </NavLink>

        <NavLink to="/products/new" end className="sidebar-link sidebar-cta">
          <span className="sidebar-icon">＋</span>
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
}

export default SideBar;
