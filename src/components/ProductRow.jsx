{/*Displays one product's info per row */}


function ProductRow({ product }) {
  return (
    <tr>
      <td>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </td>

      <td>{product.name}</td>

      <td>{product.sku}</td>

      <td>{product.category}</td>

      <td>KSh {product.price.toLocaleString()}</td>

      <td>
        {product.stock > 0 ? (
          <span className="in-stock">
            {product.stock} available
          </span>
        ) : (
          <span className="out-of-stock">
            Out of stock
          </span>
        )}
      </td>
    </tr>
  );
}

export default ProductRow;