import { Link, useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext.jsx';
import ProductForm from '../components/ProductForm.jsx';

export default function EditProducts() {
  const { id } = useParams();
  const { products, brands, loading, updateProduct } = useProductContext();

  const product = products.find((p) => p.id === id);

  if (loading) return <p className="admin-empty">Loading…</p>;

  if (!product) {
    return (
      <div className="admin-card admin-empty">
        <h1 className="admin-page-title">Product not found</h1>
        <p style={{ margin: '12px 0 16px' }}>That product no longer exists.</p>
        <Link to="/products" className="admin-primary-btn admin-inline-btn">Back to products</Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="admin-page-title">Edit product</h1>
          <p className="admin-page-sub">{product.name}</p>
        </div>
        <Link to="/products" className="admin-ghost-btn admin-inline-btn">Cancel</Link>
      </div>

      <div className="admin-form-page">
        <ProductForm
          initial={product}
          brands={brands}
          submitLabel="Save changes"
          onSubmit={(values) => updateProduct(product.id, values)}
        />
      </div>
    </>
  );
}
