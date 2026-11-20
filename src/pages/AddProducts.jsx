import ProductForm from '../components/ProductForm.jsx';

export default function AddProducts() {
  async function handleAddProduct(product) {
    console.log('Add product payload:', product);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="admin-page-title">Add product</h1>
          <p className="admin-page-sub">Create a new listing with pricing</p>
        </div>
      </div>

      <div className="admin-form-page">
        <ProductForm submitLabel="Add product" onSubmit={handleAddProduct} />
      </div>
    </>
  );
}
