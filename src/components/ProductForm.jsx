import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Electronics', 'Footwear', 'Home & Kitchen', 'Clothing', 'Bags'];

const emptyForm = {
  name: '',
  sku: '',
  category: '',
  price: '',
  description: '',
  image: '',
  stock: '',
};

function ProductForm({ initial, submitLabel, onSubmit }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ ...emptyForm, ...(initial || {}) });
  const [error, setError] = useState('');

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function checkForm() {
    if (String(form.name).trim() === '') return 'Product name is required.';
    if (String(form.sku).trim() === '') return 'SKU is required.';
    if (String(form.category).trim() === '') return 'Please choose a category.';
    if (form.price === '' || Number(form.price) < 0) return 'Enter a valid price.';
    if (form.stock === '' || Number(form.stock) < 0) return 'Enter a valid stock quantity.';
    return '';
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const message = checkForm();
    if (message) {
      setError(message);
      return;
    }

    try {
      await onSubmit({
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        description: String(form.description).trim(),
        image: String(form.image).trim(),
        stock: Number(form.stock),
      });
      navigate('/products');
    } catch (err) {
      setError(err?.message || 'Could not save the product. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card admin-form" noValidate>
      <label className="admin-field">
        <span>Product name</span>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Wireless Noise-Cancelling Headphones" />
      </label>

      <div className="admin-field-row">
        <label className="admin-field">
          <span>SKU</span>
          <input type="text" name="sku" value={form.sku} onChange={handleChange} placeholder="e.g. DM-ELC-01" />
        </label>
        <label className="admin-field">
          <span>Category</span>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Electronics"
            list="category-options"
          />
          <datalist id="category-options">
            {CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
      </div>

      <label className="admin-field">
        <span>Description</span>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Short product description" />
      </label>

      <label className="admin-field">
        <span>Image URL</span>
        <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
      </label>

      <div className="admin-field-row">
        <label className="admin-field">
          <span>Price (KSh)</span>
          <input type="number" min="0" name="price" value={form.price} onChange={handleChange} placeholder="12500" />
        </label>
        <label className="admin-field">
          <span>Stock</span>
          <input type="number" min="0" name="stock" value={form.stock} onChange={handleChange} placeholder="18" />
        </label>
      </div>

      {error && <div className="admin-error" role="alert">{error}</div>}

      <div className="admin-form-actions">
        <button type="submit" className="admin-primary-btn">{submitLabel}</button>
      </div>
    </form>
  );
}
export default ProductForm;
