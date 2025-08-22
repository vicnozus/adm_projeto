"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { products as allProducts, categories } from "@/data/products"
import type { Product, Category } from "@/types/product"

interface ProductsContextType {
  products: Product[]
  categories: Category[]
  favorites: string[]
  searchProducts: (query: string, category?: string) => Product[]
  getProductsByCategory: (category: string) => Product[]
  getProductById: (id: string) => Product | undefined
  addToFavorites: (productId: string) => void
  removeFromFavorites: (productId: string) => void
  isFavorite: (productId: string) => boolean
  filterProducts: (products: Product[], filters: ProductFilters) => Product[]
}

interface ProductFilters {
  priceRange?: [number, number]
  brands?: string[]
  subcategories?: string[]
  inStock?: boolean
  onSale?: boolean
  rating?: number
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(allProducts)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Carregar favoritos do localStorage
    const savedFavorites = localStorage.getItem("freshmarket_favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const searchProducts = (query: string, category?: string): Product[] => {
    let filteredProducts = products

    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    if (!query.trim()) {
      return filteredProducts
    }

    const searchTerm = query.toLowerCase()
    return filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )
  }

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter((product) => product.category === category)
  }

  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id)
  }

  const addToFavorites = (productId: string) => {
    const newFavorites = [...favorites, productId]
    setFavorites(newFavorites)
    localStorage.setItem("freshmarket_favorites", JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (productId: string) => {
    const newFavorites = favorites.filter((id) => id !== productId)
    setFavorites(newFavorites)
    localStorage.setItem("freshmarket_favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId)
  }

  const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
    let filtered = [...products]

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter((product) => product.price >= min && product.price <= max)
    }

    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter((product) => filters.brands!.includes(product.brand))
    }

    if (filters.subcategories && filters.subcategories.length > 0) {
      filtered = filtered.filter((product) => filters.subcategories!.includes(product.subcategory || ""))
    }

    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    if (filters.onSale) {
      filtered = filtered.filter((product) => product.discount && product.discount > 0)
    }

    if (filters.rating) {
      filtered = filtered.filter((product) => product.rating >= filters.rating!)
    }

    return filtered
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        favorites,
        searchProducts,
        getProductsByCategory,
        getProductById,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        filterProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
