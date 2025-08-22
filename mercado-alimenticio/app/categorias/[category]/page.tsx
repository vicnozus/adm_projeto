"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts } from "@/contexts/products-context"
import { Search, Grid, List } from "lucide-react"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const { getProductsByCategory, categories, filterProducts, searchProducts } = useProducts()

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState({})

  const categoryData = categories.find((cat) => cat.slug === category)
  const categoryProducts = getProductsByCategory(category)

  const filteredAndSortedProducts = useMemo(() => {
    let products = categoryProducts

    // Aplicar busca
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery, category)
    }

    // Aplicar filtros
    products = filterProducts(products, filters)

    // Aplicar ordenação
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        products.sort((a, b) => b.price - a.price)
        break
      case "rating":
        products.sort((a, b) => b.rating - a.rating)
        break
      case "name":
      default:
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return products
  }, [categoryProducts, searchQuery, category, filters, sortBy, searchProducts, filterProducts])

  if (!categoryData) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
          <p className="text-gray-600">A categoria solicitada não existe.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Category Header */}
      <div className="wine-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-4">{categoryData.name}</h1>
              <p className="text-xl text-gray-200 mb-6">{categoryData.description}</p>
              <p className="text-gray-300">{categoryProducts.length} produtos disponíveis</p>
            </div>
            <div className="relative">
              <img
                src={categoryData.image || "/placeholder.svg"}
                alt={categoryData.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters products={categoryProducts} onFiltersChange={setFilters} category={category} />
          </div>

          {/* Products Area */}
          <div className="lg:col-span-3">
            {/* Search and Controls */}
            <div className="mb-6 space-y-4">
              {/* Search */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder={`Buscar em ${categoryData.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-wine-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredAndSortedProducts.length} produto{filteredAndSortedProducts.length !== 1 ? "s" : ""}{" "}
                    encontrado{filteredAndSortedProducts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nome A-Z</SelectItem>
                      <SelectItem value="price-asc">Menor preço</SelectItem>
                      <SelectItem value="price-desc">Maior preço</SelectItem>
                      <SelectItem value="rating">Melhor avaliação</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "wine-primary text-white" : ""}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "wine-primary text-white" : ""}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-4">Tente ajustar os filtros ou buscar por outros termos.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setFilters({})
                  }}
                  className="border-wine text-wine hover:wine-primary hover:text-white"
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
