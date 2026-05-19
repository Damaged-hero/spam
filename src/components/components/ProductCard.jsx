import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow duration-200">

      {/* Image */}
      <div className="w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Category badge */}
      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full w-fit">
        {product.category}
      </span>

      {/* Name */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {product.description}
      </p>

      {/* Price + Rating */}
      <div className="flex justify-between items-center mt-auto pt-2">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          ${product.price}
        </span>
        <span className="text-sm text-yellow-500">★ {product.rating}</span>
      </div>

      {/* Stock */}
      <p className={`text-xs ${product.stock_quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
      </p>

      {/* Add to cart */}
      <button
        onClick={() => addToCart(product)}
        disabled={product.stock_quantity === 0}
        className={`mt-1 w-full py-2 text-white text-sm rounded-lg border-none transition-colors duration-200
          ${product.stock_quantity > 0
            ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
            : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
          }`}
      >
        {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>

    </div>
  );
}

export default ProductCard;
