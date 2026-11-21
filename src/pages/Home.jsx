import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext.jsx";

const FEATURES = [
  {
    title: "Add products",
    text: "Create new phone listings with specs, image and pricing.",
  },
  {
    title: "Edit & reprice",
    text: "Change any product's price or details at any time.",
  },
  {
    title: "Search & filter",
    text: "Find products instantly by name, spec or brand.",
  },
  {
    title: "Delete products",
    text: "Remove listings that are no longer offered.",
  },
];

function Home() {
  const { products } = useProductContext();

  const totalStock = products.reduce(
    (sum, product) => sum + (Number(product.stock) || 0),
    0
  );

  return (
    <div className="space-y-10">

      {/* Welcome section */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 sm:px-10 sm:py-14 shadow-lg">

        {/* Decorative background elements */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Welcome text */}
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Admin 
            </p>

            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Welcome to <span className="text-blue-300">DukaMart</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Your control center for DukaMart online store. Add products,
              change prices, keep stock up to date and find anything in seconds.
            </p>

            {/* Navigation buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-400"
              >
                Manage products
              </Link>

              <Link
                to="/products/new"
                className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                + Add a product
              </Link>
            </div>
          </div>

          {/* Dashboard statistics */}
          <div className="grid w-full grid-cols-2 gap-4 lg:max-w-sm">
            <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm font-medium text-blue-200">
                Total Products
              </p>
              <p className="mt-3 text-3xl font-bold text-white">
                {products.length}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Products listed
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-sm font-medium text-blue-200">
                Total Stock
              </p>
              <p className="mt-3 text-3xl font-bold text-white">
                {totalStock}
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Units available
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Features section */}
      <section>
        <div className="mb-6">
         

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            What you can do here
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Everything you need to manage your store inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                0{index + 1}
              </div>

              <h3 className="text-base font-bold text-slate-800">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
