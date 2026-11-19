import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h2 className="text-2xl font-bold mb-10">
        DukaMart
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          to="/"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          className="p-3 rounded-lg hover:bg-slate-700"
        >
          Products
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;