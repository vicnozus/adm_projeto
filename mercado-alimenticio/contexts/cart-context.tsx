"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useProducts } from "@/contexts/products-context"
import type { CartItem, CartSummary } from "@/types/cart"
import type { Product } from "@/types/product"

interface CartContextType {
  items: CartItem[]
  summary: CartSummary
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
  isInCart: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const SHIPPING_THRESHOLD = 150
const SHIPPING_COST = 12.9

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { getProductById } = useProducts()

  useEffect(() => {
    // Carregar carrinho do localStorage
    const savedCart = localStorage.getItem("freshmarket_cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Salvar carrinho no localStorage
    localStorage.setItem("freshmarket_cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.id)

      if (existingItem) {
        // Atualizar quantidade do item existente
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stockQuantity)
        return prevItems.map((item) => (item.productId === product.id ? { ...item, quantity: newQuantity } : item))
      } else {
        // Adicionar novo item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          brand: product.brand,
          unit: product.unit,
          weight: product.weight,
          quantity: Math.min(quantity, product.stockQuantity),
          maxQuantity: product.stockQuantity,
        }
        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.min(quantity, item.maxQuantity) } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getItemQuantity = (productId: string): number => {
    const item = items.find((item) => item.productId === productId)
    return item ? item.quantity : 0
  }

  const isInCart = (productId: string): boolean => {
    return items.some((item) => item.productId === productId)
  }

  // Calcular resumo do carrinho
  const summary: CartSummary = {
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    discount: items.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price) * item.quantity
      }
      return total
    }, 0),
    shipping: 0,
    total: 0,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
  }

  // Calcular frete
  summary.shipping = summary.subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

  // Calcular total
  summary.total = summary.subtotal + summary.shipping

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
