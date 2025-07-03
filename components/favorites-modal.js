"use client"

import { X, ShoppingCart, Trash2 } from "lucide-react"

export default function FavoritesModal({ isOpen, onClose, favorites, onAddToCart, onRemoveFromFavorites }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Избранное</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Нет избранных товаров</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-lg font-bold">{item.price.toLocaleString()} ₽</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveFromFavorites(item.id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
