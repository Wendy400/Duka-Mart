// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CATEGORIES = ['Electronics', 'Footwear', 'Home & Kitchen', 'Clothing', 'Bags'];

// const emptyForm = {
//   name: '',
//   sku: '',
//   category: '',
//   price: '',
//   description: '',
//   image: '',
//   stock: '',
// };

// function ProductForm({ initial, submitLabel, onSubmit }) {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ ...emptyForm, ...(initial || {}) });
//   const [error, setError] = useState('');

//   function handleChange(event) {
//     setForm({ ...form,
//          [event.target.name]: event.target.value });
//   }

//   //form validation before submittion
//   function checkForm() {
//     if (String(form.name).trim() === '') return 'Product name is required.';
//     if (String(form.sku).trim() === '') return 'SKU is required.';
//     if (String(form.category).trim() === '') return 'Please choose a category.';
//     if (form.price === '' || Number(form.price) < 0) return 'Enter a valid price.';
//     if (form.stock === '' || Number(form.stock) < 0) return 'Enter a valid stock quantity.';
//     return '';
//   }
// //function to prevent default form submission
//   async function handleSubmit(event) {
//     event.preventDefault();

//     const message = checkForm();
//     if (message) {
//       setError(message);
//       return;
//     }

//     try {
//       await onSubmit({
//         name: form.name.trim(),
//         sku: form.sku.trim(),
//         category: form.category.trim(),
//         price: Number(form.price),
//         description: String(form.description).trim(),
//         image: String(form.image).trim(),
//         stock: Number(form.stock),
//       });
//       navigate('/products');
//     } catch (err) {
//       setError(err?.message || 'Could not save the product. Please try again.');
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="admin-card admin-form" noValidate>
//       <label className="admin-field">
//         <span>Product name</span>

//         <input type="text" name="name"
//                value={form.name} 
//                onChange={handleChange} 
//                placeholder="e.g. Wireless Noise-Cancelling Headphones" />
//       </label>

//       <div className="admin-field-row">
//         <label className="admin-field">
//           <span>SKU</span>
//           <input type="text" name="sku" 
//                  value={form.sku} 
//                  onChange={handleChange} 
//                  placeholder="e.g. DM-ELC-01" />
//         </label>

//         <label className="admin-field">
//           <span>Category</span>
//           <input
//             type="text"
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             placeholder="e.g. Electronics"
//             list="category-options"
//           />
//           <datalist id="category-options">
//             {CATEGORIES.map((c) => (
//               <option key={c} value={c} />
//             ))}
//           </datalist>
//         </label>
//       </div>

//       <label className="admin-field">
//         <span>Description</span>
//         <textarea name="description" 
//                   value={form.description} 
//                   onChange={handleChange} 
//                   rows={3} 
//                   placeholder="Short product description" />
//       </label>

//       <label className="admin-field">
//         <span>Image URL</span>
//         <input type="text" 
//                name="image" 
//                value={form.image} 
//                onChange={handleChange} 
//                placeholder="https://images.unsplash.com/..." />
//       </label>

//       <div className="admin-field-row">
//         <label className="admin-field">
//           <span>Price (KSh)</span>
//           <input type="number" 
//                  min="0" 
//                  name="price" 
//                  value={form.price} 
//                  onChange={handleChange} 
//                  placeholder="12500" />
//         </label>

//         <label className="admin-field">
//           <span>Stock</span>
//           <input type="number" 
//                  min="0" 
//                  name="stock" 
//                  value={form.stock} 
//                  onChange={handleChange} 
//                  placeholder="18" />
//         </label>
//       </div>

//       {error && <div className="admin-error" role="alert">{error}</div>}

//       <div className="admin-form-actions">
//         <button type="submit" 
//                 className="admin-primary-btn">{submitLabel}</button>
//       </div>
//     </form>
//   );
// }
// export default ProductForm;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
    'Electronics',
    'Footwear',
    'Home & Kitchen',
    'Clothing',
    'Bags',
];

const emptyForm = {
    name: '',
    sku: '',
    category: '',
    price: '',
    description: '',
    image: '',
    stock: '',
};

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

function ProductForm({ initial, submitLabel, onSubmit }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({ ...emptyForm, ...(initial || {}) });
    const [error, setError] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
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

            alert(
                initial
                    ? "Product updated successfully!"
                    : "Product added successfully!"
            );

            navigate('/products');
        } catch (err) {
            setError(err?.message || 'Could not save the product. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Product name */}
            <div>
                <label htmlFor="name" className={labelClass}>
                    Product name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Wireless Noise-Cancelling Headphones"
                    className={inputClass}
                />
            </div>

            {/* SKU and category */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="sku" className={labelClass}>
                        SKU
                    </label>
                    <input
                        id="sku"
                        type="text"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        placeholder="e.g. DM-ELC-01"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="category" className={labelClass}>
                        Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g. Electronics"
                        list="category-options"
                        className={inputClass}
                    />

                    <datalist id="category-options">
                        {CATEGORIES.map((category) => (
                            <option key={category} value={category} />
                        ))}
                    </datalist>
                </div>
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className={labelClass}>
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter a short description of the product..."
                    className={`${inputClass} resize-y`}
                />
            </div>

            {/* Image URL */}
            <div>
                <label htmlFor="image" className={labelClass}>
                    Image URL
                </label>
                <input
                    id="image"
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://example.com/product-image.jpg"
                    className={inputClass}
                />
                <p className="mt-2 text-xs text-slate-400">
                    Paste a link to the product image.
                </p>
            </div>

            {/* Price and stock */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="price" className={labelClass}>
                        Price (KSh)
                    </label>
                    <input
                        id="price"
                        type="number"
                        min="0"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="1000"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label htmlFor="stock" className={labelClass}>
                        Stock quantity
                    </label>
                    <input
                        id="stock"
                        type="number"
                        min="0"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="1"
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                >
                    {submitLabel}
                </button>
            </div>

        </form>
    );
}

export default ProductForm;

