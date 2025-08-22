"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts } from "@/contexts/products-context"
import { Percent, Clock, Grid, List } from "lucide-react"

export default function OffersPage() {
  const { products } = useProducts()
  const [sortBy, setSortBy] = useState("discount-desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filtrar apenas produtos em oferta
  const offersProducts = products.filter((product) => product.discount && product.discount > 0)

  const sortedProducts = useMemo(() => {
    const sorted = [...offersProducts]

    switch (sortBy) {
      case "discount-desc":
        sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
      case "discount-asc":
        sorted.sort((a, b) => (a.discount || 0) - (b.discount || 0))
        break
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "name":
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return sorted
  }, [offersProducts, sortBy])

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="wine-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="wine-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/20">
              <Percent className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ofertas Especiais</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Aproveite nossos preços especiais em produtos selecionados. Ofertas por tempo limitado!
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Offer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">{offersProducts.length}</div>
            <div className="text-red-800 font-semibold">Produtos em Oferta</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.max(...offersProducts.map((p) => p.discount || 0))}%
            </div>
            <div className="text-green-800 font-semibold">Maior Desconto</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="flex items-center justify-center text-blue-600 mb-2">
              <Clock className="w-8 h-8 mr-2" />
              <span className="text-3xl font-bold">24h</span>
            </div>
            <div className="text-blue-800 font-semibold">Ofertas Renovadas</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {sortedProducts.length} produto{sortedProducts.length !== 1 ? "s" : ""} em oferta
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discount-desc">Maior desconto</SelectItem>
                <SelectItem value="discount-asc">Menor desconto</SelectItem>
                <SelectItem value="price-asc">Menor preço</SelectItem>
                <SelectItem value="price-desc">Maior preço</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
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

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma oferta disponível no momento</h3>
            <p className="text-gray-600 mb-4">
              Fique atento às nossas redes sociais para não perder as próximas ofertas!
            </p>
            <Button
              asChild
              variant="outline"
              className="border-wine text-wine hover:wine-primary hover:text-white bg-transparent"
            >
              <a href="/">Ver Todos os Produtos</a>
            </Button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 wine-primary text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Não Perca Nenhuma Oferta!</h3>
          <p className="text-gray-200 mb-6">
            Cadastre-se em nossa newsletter e seja o primeiro a saber sobre nossas promoções exclusivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-wine hover:bg-gray-100 font-semibold px-6">Cadastrar</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
