import { Link, useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext.jsx';
import ProductForm from '../components/ProductForm.jsx';

export default function EditProducts() {
  const { id } = useParams();
  const { products, loading, updateProduct } = useProductContext();

  const product = products.find((p) => String(p.id) === String(id));

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm font-medium text-slate-500">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-800">
            Product not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            That product no longer exists or may have been removed from your inventory.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7">

      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>

          <h1 className="mt-2 text-3xl font-bold text-slate-800">
            Edit product
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update the information for :{' '}
            <span className="font-semibold text-slate-700">
              {product.name}
            </span>
          </p>
        </div>

         <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          Cancel
        </Link> 

       
      </div>



      {/* Edit form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <ProductForm
          initial={product}
          submitLabel="Save changes"
          onSubmit={(values) => updateProduct(product.id, values)}
        />
      </div>

    </div>
  );
}

