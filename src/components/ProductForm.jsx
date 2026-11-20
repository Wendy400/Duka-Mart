// IMPORT: useState is a built-in React HOOK. It lets this component REMEMBER what the user typed.
import { useState } from 'react';
// IMPORT: useNavigate is a HOOK from react-router-dom. It gives a function that changes the page by code.
import { useNavigate } from 'react-router-dom';

// The categories that exist in db.json. Used to fill the dropdown so new products
// always match the categories already stored on the server.
const CATEGORIES = ['Electronics', 'Footwear', 'Home & Kitchen', 'Clothing', 'Bags'];

// What an empty form looks like (used when adding a new product).
// Keys match the fields of a product object in db.json exactly.
const emptyForm = {
  name: '',
  sku: '',
  category: '',
  price: '',
  description: '',
  image: '',
  stock: '',
};

// One form used by BOTH the Add page and the Edit page.
// PROPS (inputs from the parent page):
//   initial     - the product to edit. Leave it out when adding a new product.
//   submitLabel - the text on the button ("Add product" or "Save changes")
//   onSubmit    - a function that saves the values (the Add page passes addProduct,
//                 the Edit page passes updateProduct). It is called when the form is valid.
// Used by: pages/AddProducts.jsx and pages/EditProducts.jsx.
export default function ProductForm({ initial, submitLabel, onSubmit }) {
  // HOOK: navigate('/products') moves to the list after saving
  const navigate = useNavigate();

  // HOOK: ONE state object holds every field. When editing, start with the product's data;
  // when adding, start with the empty form. Spread + fallback keeps every key present
  // even if the incoming product is missing one.
  const [form, setForm] = useState({ ...emptyForm, ...(initial || {}) });
  // The error message shown under the form ('' means no error)
  const [error, setError] = useState('');

  // ONE function for all the inputs. Each input has a "name" (name, sku, price, ...),
  // so event.target.name says WHICH field changed and event.target.value is the new text.
  // [event.target.name] uses the name as the key: copy the form, replace only that field.
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // Checks the values. Returns a message if something is wrong, or '' if all is fine.
  function checkForm() {
    if (String(form.name).trim() === '') return 'Product name is required.';
    if (String(form.sku).trim() === '') return 'SKU is required.';
    if (String(form.category).trim() === '') return 'Please choose a category.';
    if (form.price === '' || Number(form.price) < 0) return 'Enter a valid price.';
    if (form.stock === '' || Number(form.stock) < 0) return 'Enter a valid stock quantity.';
    return '';
  }

  // Runs when the user presses the submit button.
  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const message = checkForm();
    if (message) {
      setError(message); // show the problem and stop here
      return;
    }

    try {
      // Save with the clean values (trim() removes spaces at the start and end).
      // Numbers are converted so they match the types stored in db.json.
      await onSubmit({
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        description: String(form.description).trim(),
        image: String(form.image).trim(),
        stock: Number(form.stock),
      });
      navigate('/products'); // saved, so go back to the list
    } catch {
      // onSubmit failed, most likely because the API is not running
      setError('Could not save the product. Is the API running?');
    }
  }

  return (
    // noValidate: we do our own checking in checkForm() instead of the browser's pop-ups
    <form onSubmit={handleSubmit} className="admin-card admin-form" noValidate>
      {/* Each input is "controlled": value comes from the form state, and handleChange updates it */}
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
          {/* Dropdown filled from CATEGORIES so values match db.json exactly */}
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Choose a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
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

      {/* Only show the error box when there is an error. role="alert" lets screen readers announce it. */}
      {error && <div className="admin-error" role="alert">{error}</div>}

      <div className="admin-form-actions">
        <button type="submit" className="admin-primary-btn">{submitLabel}</button>
      </div>
    </form>
  );
}
