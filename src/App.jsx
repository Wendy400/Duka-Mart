import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import AddProducts from './pages/AddProducts.jsx';
import EditProducts from './pages/EditProducts.jsx';
import { ThemeContext } from './context/ThemeContext.jsx';
import './App.css';

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <SideBar />
      <main className="admin-main">
        <div className="app-topbar">
          <ThemeToggle />
        </div>
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
