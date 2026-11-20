import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext(null);

const API_URL = "http://localhost:3001/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load products from the json-server backend on mount.
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to display products");
        }
        const data = await response.json();
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching products:", err);
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  // Delete a product from DukaMart.
  async function deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((current) => current.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  // Add a new product.
  async function addProduct(product) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const created = await response.json();
      setProducts((current) => [...current, created]);
      return created;
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    }
  }

  // Update an existing product.
  async function updateProduct(id, updates) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updated = await response.json();
      setProducts((current) =>
        current.map((product) => (product.id === id ? updated : product))
      );
      return updated;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
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
