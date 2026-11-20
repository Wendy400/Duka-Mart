
import { useState, useEffect , useContext} from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import SideBar from "./components/SideBar";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeContext } from "./context/ThemeContext";



function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch("http://localhost:3001/products")
    .then(response =>{
      if (!response.ok){
        throw new Error("Failed to display products")
      }
     return response.json()
     } )
    .then(data => {
      setProducts(data);
    })
    .catch(error => console.log("Error fetching products:", error));
}, []);


// Delete a product from dukamart 
async function handleDelete(id) {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    // Update the products displayed in React
    setProducts(products.filter(product => product.id !== id));

  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

const { theme } = useContext(ThemeContext);




  return (
    <div className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white"  : "bg-gray-100 text-gray-900" }`}
    >

      <SideBar/>
      <ThemeToggle/>

      <main>
        <Routes>

        <Route path="/" element={<Home products={products} />} />

        <Route path="/products" 
               element={<Products products={products} 
                                  onDelete={handleDelete}
                                  
        />} />

      </Routes>

      </main>

      

      

    </div>
  );
}

export default App;