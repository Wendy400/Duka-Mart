import { NavLink } from "react-router-dom";

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
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/products/new"
          className={({ isActive }) =>
            "sidebar-link" + (isActive ? " active" : "")
          }
        >
          Add Product
        </NavLink>
      </nav>
    </aside>
  );
}

export default SideBar;
