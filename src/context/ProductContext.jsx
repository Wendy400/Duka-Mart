import { createContext, useContext, useState, useEffect } from "react";
import * as store from "../data/store.js";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => store.getProducts());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep state in sync with the store (same tab + other tabs).
  useEffect(() => {
    const unsubscribe = store.subscribe((next) => setProducts(next));
    return unsubscribe;
  }, []);

  // Add a new product.
  function addProduct(product) {
    try {
      const created = store.addProduct(product);
      setProducts(store.getProducts());
      return created;
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.message);
      throw err;
    }
  }

  // Update an existing product.
  function updateProduct(id, updates) {
    try {
      store.updateProduct(id, updates);
      setProducts(store.getProducts());
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message);
      throw err;
    }
  }

  // Delete a product.
  function deleteProduct(id) {
    try {
      store.deleteProduct(id);
      setProducts(store.getProducts());
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message);
    }
  }

  // Unique brand/category list derived from products.
  const brands = [...new Set(products.map((product) => product.category))];

  const value = {
    products,
    brands,
    loading,
    error,
    deleteProduct,
    addProduct,
    updateProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

export default ProductContext;
