"use client"

import Link from "next/link"
import { useState } from "react"
import { Heart, ShoppingCart, Star, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useProducts } from "@/contexts/products-context"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  showAddToCart?: boolean
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useProducts()
  const { addItem, updateQuantity, getItemQuantity } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const favorite = isFavorite(product.id)
  const cartQuantity = getItemQuantity(product.id)

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product.id)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addItem(product, 1)
    // Simular delay para feedback visual
    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsAddingToCart(false)
  }

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      <CardContent className="p-4">
        {/* Discount Badge */}
        {product.discount && product.discount > 0 && (
          <div className="absolute top-2 left-2 wine-primary text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
            -{product.discount}%
          </div>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2 z-10 hover:bg-white/80"
          onClick={handleFavoriteToggle}
        >
          <Heart className={`w-4 h-4 ${favorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </Button>

        {/* Product Image */}
        <Link href={`/produto/${product.id}`}>
          <div className="relative mb-4 overflow-hidden rounded-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold">Indisponível</span>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            <span>({product.reviewCount})</span>
          </div>

          <Link href={`/produto/${product.id}`}>
            <h3 className="font-semibold text-gray-900 group-hover:text-wine transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-wine">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {product.weight} • {product.brand}
              </p>
            </div>
          </div>

          {/* Add to Cart Button or Quantity Controls */}
          {showAddToCart && (
            <div className="mt-3">
              {cartQuantity === 0 ? (
                <Button
                  className="w-full wine-primary hover:wine-dark text-white"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                >
                  {isAddingToCart ? (
                    "Adicionando..."
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Adicionar
                    </>
                  )}
                </Button>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(cartQuantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="font-semibold text-wine min-w-[2rem] text-center">{cartQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(cartQuantity + 1)}
                      disabled={cartQuantity >= product.stockQuantity}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">no carrinho</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
