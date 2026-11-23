import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";
import ProductForm from "../components/ProductForm.jsx";

export default function AddProducts() {
  const { addProduct } = useProductContext();

  return (
    <div className="mx-auto max-w-5xl space-y-7">

      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          

          <h1 className="mt-2 text-3xl font-bold text-slate-800">
            Add product
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a new product listing for your store.
          </p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>

      

      {/* Product form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <ProductForm
          submitLabel="Add product"
          onSubmit={addProduct}
        />
      </div>

    </div>
  );
}
