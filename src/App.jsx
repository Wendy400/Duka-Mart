import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import AddProducts from './pages/AddProducts.jsx';
import EditProducts from './pages/EditProducts.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<AddProducts />} />
          <Route path="/products/:id/edit" element={<EditProducts />} />
        </Routes>
      </main>
    </div>
  );
}
