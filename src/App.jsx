
//  import './App.css'

// function App() {

//   return (
//     <div className="flex items-center justify-center h-screen bg-blue-100">
//       <h1 className="text-3xl font-bold text-blue-600 underline">
//         HELLO WOLRD
//       </h1>
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import SideBar from "./components/SideBar";

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




  return (
    <div className="flex min-h-screen bg-gray-100">

      <SideBar/>

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