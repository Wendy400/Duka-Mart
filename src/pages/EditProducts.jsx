import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";

function EditProducts() {
  const { id } = useParams();
  const { products, updateProduct } = useProductContext();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  // Populate the form once the matching product is available.
  useEffect(() => {
    const product = products.find((item) => String(item.id) === String(id));
    if (product) {
      setForm(product);
    }
  }, [products, id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await updateProduct(form.id, {
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

  if (!form) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>

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
            {saving ? "Saving..." : "Save Changes"}
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

export default EditProducts;
