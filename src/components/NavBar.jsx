import {Link,NavLink} from "react-router-dom";
//sidebar links

{/*Displays the navigation menu */}

function NavBar(){
return(
  <aside className="sidebar">
    <Link to="/" className="sidebar-brand">
    <div>
      <div className="sidebar-title">DukaMart Admin</div>
      <div className="sidebar-sub">Control panel</div>
    </div>
    </Link>

  <nav className="sidebar-links" aria-label="Main">

    <NavLink to="/" end className="sidebar-link">Home</NavLink>
    <NavLink to="/" end className="sidebar-link">Products</NavLink>
    <NavLink to="/" end className="sidebar-link">Add products</NavLink>
  </nav>
  </aside>
)
}

export default NavBar;