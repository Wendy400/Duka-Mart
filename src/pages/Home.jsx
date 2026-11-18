import { Link } from "react-router-dom";

function Home({products}) {

  const actions = [
    {
      title: "Add Products",
      description: "Add new products to your inventory",
      icon: "➕"
    },
    {
      title: "Edit Products",
      description: "Update existing product information",
      icon: "✏️"
    },
    {
      title: "Delete Products",
      description: "Remove products from your inventory",
      icon: "🗑️"
    },
    {
      title: "Search & Filter",
      description: "Find products quickly",
      icon: "🔍"
    }
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-2">
        Welcome to DukaMart!
      </h1>

      <p className="text-gray-600 mb-8">
        Manage your store inventory in one place.
      </p>
      <h2>Total products: {products.length}</h2>

      <div className="grid grid-cols-2 gap-6">

        {actions.map((action, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm"
          >

            <h2 className="text-xl font-semibold mb-2">
              {action.icon} {action.title}
            </h2>

            <p className="text-gray-600 mb-4">
              {action.description}
            </p>

            <Link
              to="/products"
              className="text-blue-600 font-medium hover:underline"
            >
              Go to Products →
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Home;