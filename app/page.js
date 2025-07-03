"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import Advertisement from "@/components/advertisement"
import AuthModal from "@/components/auth-modal"
import ProfileModal from "@/components/profile-modal"
import CartModal from "@/components/cart-modal"
import FavoritesModal from "@/components/favorites-modal"
import OrderSuccessModal from "@/components/order-success-modal"
import { products } from "@/data/products"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showDiscounts, setShowDiscounts] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false)
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])

  const itemsPerPage = 15

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedCart = localStorage.getItem("cart")
    const savedFavorites = localStorage.getItem("favorites")

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const filteredProducts = products.filter((product) => {
    if (showDiscounts) return product.discount > 0
    if (selectedCategory === "all") return true
    return product.category === selectedCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]
    })
  }

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const handleOrderComplete = () => {
    setCart([])
    setIsCartModalOpen(false)
    setIsOrderSuccessModalOpen(true)
  }

  const categories = ["all", "electronics", "clothing", "books", "home", "sports"]

  const getCategoryName = (category) => {
    const names = {
      electronics: "Электроника",
      clothing: "Одежда",
      books: "Книги",
      home: "Дом",
      sports: "Спорт",
    }
    return names[category] || category
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Advertisement position="top-left" />
      <Advertisement position="top-right" />
      <Advertisement position="bottom-left" />
      <Advertisement position="bottom-right" />

      <Header
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        favoritesCount={favorites.length}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onCartClick={() => setIsCartModalOpen(true)}
        onFavoritesClick={() => setIsFavoritesModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Интернет-магазин</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => {
                setShowDiscounts(false)
                setSelectedCategory("all")
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                !showDiscounts && selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Все товары
            </button>

            <button
              onClick={() => {
                setShowDiscounts(true)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                showDiscounts ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Скидки
            </button>

            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setShowDiscounts(false)
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  !showDiscounts && selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid
          products={currentProducts}
          onAddToCart={addToCart}
          onAddToFavorites={addToFavorites}
          favorites={favorites}
        />

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === page ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(userData) => {
          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
        }}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        onUpdateCart={setCart}
        onOrderComplete={handleOrderComplete}
      />

      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        onAddToCart={addToCart}
        onRemoveFromFavorites={(productId) => {
          setFavorites((prev) => prev.filter((item) => item.id !== productId))
        }}
      />

      <OrderSuccessModal isOpen={isOrderSuccessModalOpen} onClose={() => setIsOrderSuccessModalOpen(false)} />
    </div>
  )
}
