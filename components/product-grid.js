"use client"

import { Heart, ShoppingCart } from "lucide-react"

export default function ProductGrid({ products, onAddToCart, onAddToFavorites, favorites }) {
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                -{product.discount}%
              </div>
            )}
            <button
              onClick={() => onAddToFavorites(product)}
              className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
                isFavorite(product.id)
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()} сумм
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice.toLocaleString()} сумм</span>
                )}
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>В корзину</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
