
function Products({ products, onDelete }) {

    // Determine the stock status of each product.
    // These conditions are for displaying the status only.
    function getStockStatus(stock) {
        if (stock === 0) {
            return {
                label: "Out of Stock",
                style: "bg-red-100 text-red-700"
            };
        }

        if (stock <= 5) {
            return {
                label: "Low Stock",
                style: "bg-orange-100 text-orange-700"
            };
        }

        return {
            label: "In Stock",
            style: "bg-green-100 text-green-700"
        };
    }

    return (
        <div className="space-y-6">

            {/* Page heading */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Products
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage and monitor your store inventory.
                    </p>
                </div>

                {/* Visual button for tomorrow's functionality */}
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
                >
                    + Add Product
                </button>

            </div>

            {/* Search and filter UI - functionality comes later */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">

                <input
                    type="text"
                    placeholder="Search products..."
                    className="border border-gray-200 rounded-lg px-4 py-3 flex-1 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    className="border border-gray-200 rounded-lg px-4 py-3 outline-none"
                    defaultValue="all"
                >
                    <option value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Bags">Bags</option>
                </select>

            </div>

            {/* Product inventory table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="p-5 border-b border-gray-100">
                    <h2 className="font-bold text-gray-800">
                        Inventory List
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {products.length} products available
                    </p>
                </div>

                {/* overflow-x-auto makes the table scroll on small screens */}
                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="bg-gray-50 text-gray-500 text-sm">
                            <tr>
                                <th className="p-4 font-semibold">Product</th>
                                <th className="p-4 font-semibold">SKU</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold">Stock</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Actions</th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {products.map(product => {

                                // Get the correct visual stock label and color.
                                const status = getStockStatus(product.stock);

                                return (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >

                                        {/* Product image and name */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3 min-w-64">

                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />

                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {product.name}
                                                    </p>

                                                    <p className="text-xs text-gray-400 mt-1">
                                                        ID: {product.id}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        <td className="p-4 text-sm text-gray-600">
                                            {product.sku}
                                        </td>

                                        <td className="p-4 text-sm text-gray-600">
                                            {product.category}
                                        </td>

                                        <td className="p-4 text-sm font-medium text-gray-800">
                                            KSh {product.price.toLocaleString()}
                                        </td>

                                        <td className="p-4 text-sm text-gray-600">
                                            {product.stock}
                                        </td>

                                        {/* Stock status badge */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${status.style}`}
                                            >
                                                {status.label}
                                            </span>
                                        </td>

                                        {/*Actions column , delet and edit */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">

                                                
                                                <button
                                                    type="button"
                                                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                                    onClick ={() => onDelete(product.id)}
                                               >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>

                </div>
            </div>

        </div>
    );
}

export default Products;

