import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";

const EMPTY = {
  name: "",
  sku: "",
  category: "",
  price: "",
  stock: "",
  description: "",
  image: "",
};

function AddProducts() {
  const { addProduct } = useProductContext();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await addProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      navigate("/products");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          SKU
          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Price (KSh)
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Stock
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
            className="border border-gray-200 rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600">
          Image URL
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-600 sm:col-span-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="border border-gray-200 rounded-lg p-2"
          />
        </label>

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
