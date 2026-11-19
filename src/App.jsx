
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
    .then(response => response.json())
    .then(data => {
      setProducts(data);
    })
    .catch(error => console.log("Error fetching products:", error));
}, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <SideBar/>

      <main>
        <Routes>

        <Route path="/" element={<Home products={products} />} />

        <Route path="/products" element={<Products products={products} />} />

      </Routes>

      </main>

      

      

    </div>
  );
}

export default App;