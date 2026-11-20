import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";

const FEATURES = [
  {
    icon: "➕",
    title: "Add products",
    text: "Create new phone listings with specs, image and pricing.",
  },
  {
    icon: "✏️",
    title: "Edit & reprice",
    text: "Change any product's price or details at any time.",
  },
  {
    icon: "🔍",
    title: "Search & filter",
    text: "Find products instantly by name, spec or brand.",
  },
  {
    icon: "🗑️",
    title: "Delete products",
    text: "Remove listings that are no longer offered.",
  },
];

function Home() {
  const { products, brands } = useProductContext();

  return (
    <div className="admin-landing">
      <section className="admin-hero">
        <div className="admin-hero-glow">
          <div className="admin-hero-content">
            <h1 className="admin-hero-title">
              Welcome to <span>Duka Mart</span>
            </h1>
            <p className="admin-hero-text">
              Your control center for DukaMart online store. Add products, change
              prices, keep stock up to date and find anything in seconds.
            </p>
            <div className="admin-hero-actions">
              <Link to="/products" className="admin-hero-btn-primary">
                Manage products
              </Link>
              <Link to="/products/new" className="admin-hero-btn">
                Add a product
              </Link>
            </div>
          </div>
          <div className="admin-hero-stats">
            <div className="admin-hero-stat">
              <div className="admin-hero-stat-value">{products.length}</div>
              <div className="admin-hero-stat-label">Products</div>
            </div>
            <div className="admin-hero-stat">
              <div className="admin-hero-stat-value">{brands.length}</div>
              <div className="admin-hero-stat-label">Brands</div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-features">
        <h2 className="admin-feature-title">What you can do here</h2>
        <div className="admin-features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="admin-feature">
              <div className="admin-feature-icon">{feature.icon}</div>
              <h3 className="admin-feature-name">{feature.title}</h3>
              <p className="admin-feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
