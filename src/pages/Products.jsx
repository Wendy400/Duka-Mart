import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { useProductContext } from "../context/ProductContext.jsx";

function Products() {
  const { products, deleteProduct } = useProductContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get all unique product categories
  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const searchText = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.sku.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Determine the stock status of each product
  function getStockStatus(stock) {
    if (Number(stock) === 0) {
      return {
        label: "Out of Stock",
        style: "bg-red-50 text-red-700 ring-1 ring-red-200",
      };
    }

    if (Number(stock) <= 5) {
      return {
        label: "Low Stock",
        style: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      };
    }

    return {
      label: "In Stock",
      style: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    };
  }

  // Calculate inventory summary values
  const totalProducts = products.length;

  const inStock = products.filter(
    (product) => Number(product.stock) > 5
  ).length;

  const lowStock = products.filter(
    (product) => Number(product.stock) > 0 && Number(product.stock) <= 5
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock) === 0
  ).length;

  // Delete product after confirmation
  function handleDelete(product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (confirmed) {
      deleteProduct(product.id);
    }
  }

  return (
    <div className="w-full min-w-0 space-y-7">

      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Products
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your products, pricing and inventory.
          </p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-md sm:w-auto"
        >
          <span className="text-lg">+</span>
          Add Product
        </Link>
      </div>

      {/* Inventory summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            Total Products
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            {totalProducts}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Products in your catalogue
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            In Stock
          </p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-600">
            {inStock}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            More than 5 units available
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            Low Stock
          </p>
          <h2 className="mt-2 text-2xl font-bold text-amber-600">
            {lowStock}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            1 to 5 units remaining
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            Out of Stock
          </p>
          <h2 className="mt-2 text-2xl font-bold text-red-600">
            {outOfStock}
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Products needing restocking
          </p>
        </div>

      </div>

      {/* Search and category filters */}
         <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
         <div className="mb-4">
           <h2 className="font-semibold text-slate-800">
             Find Products
           </h2>
           <p className="text-sm text-slate-500 mt-1">
             Search by product name or SKU, or filter by category.
           </p>
         </div>

        <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end">
          <div className="min-w-0 flex-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <div className="min-w-0 flex-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Inventory heading */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-2 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Inventory List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredProducts.length} of {totalProducts} products
            </p>
          </div>
        </div>

        {/* MOBILE VIEW: Product cards */}
        <div className="space-y-4 p-4 md:hidden">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const status = getStockStatus(product.stock);

              return (
                <div
                  key={product.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >

                  {/* Product image and name */}
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 rounded-lg border border-slate-100 bg-slate-50 object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-semibold text-slate-800">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        ID: {product.id}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>

                  {/* Product details */}
                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">

                    <div>
                      <p className="text-xs text-slate-400">
                        Category
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-slate-700">
                        {product.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Price
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        KSh {Number(product.price).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Stock
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {product.stock} units
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Status
                      </p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.style}`}
                      >
                        {status.label}
                      </span>
                    </div>

                  </div>

                  {/* Product actions */}
                  <div className="mt-4 flex gap-3 border-t border-slate-100 pt-4">
                    <Link
                      to={`/products/${product.id}/edit`}
                      className="flex-1 rounded-lg bg-blue-50 px-4 py-2.5 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <p className="font-semibold text-slate-700">
                No products found
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or category filter.
              </p>
            </div>
          )}

        </div>

        {/* TABLET AND DESKTOP VIEW */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px] text-left">

            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Product</th>
                <th className="px-5 py-4 font-semibold">SKU</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Price</th>
                <th className="px-5 py-4 font-semibold">Stock</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const status = getStockStatus(product.stock);

                  return (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-blue-50/40"
                    >

                      <td className="px-5 py-4">
                        <div className="flex min-w-64 items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-14 w-14 rounded-xl border border-slate-100 bg-slate-50 object-cover"
                          />

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Product ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.sku}
                      </td>

                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                          {product.category}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                        KSh {Number(product.price).toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        {product.stock}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${status.style}`}
                        >
                          {status.label}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/products/${product.id}/edit`}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <p className="font-semibold text-slate-700">
                      No products found
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Try changing your search or category filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Products;
