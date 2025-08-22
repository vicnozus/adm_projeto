"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/contexts/products-context"
import { useAuth } from "@/contexts/auth-context"
import { Heart, ShoppingBag } from "lucide-react"

export default function FavoritesPage() {
  const { products, favorites } = useProducts()
  const { user } = useAuth()
  const router = useRouter()
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/favoritos")
      return
    }

    // Filtrar produtos favoritos
    const favProducts = products.filter((product) => favorites.includes(product.id))
    setFavoriteProducts(favProducts)
  }, [user, products, favorites, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="wine-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="wine-primary w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/20">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Meus Favoritos</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Seus produtos favoritos em um só lugar. Adicione ao carrinho quando quiser!
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {favoriteProducts.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-wine">
                {favoriteProducts.length} produto{favoriteProducts.length !== 1 ? "s" : ""} favorito
                {favoriteProducts.length !== 1 ? "s" : ""}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="wine-primary w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Nenhum favorito ainda</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explore nossos produtos e adicione seus favoritos clicando no ícone de coração. Assim você pode
              encontrá-los facilmente depois!
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="wine-primary hover:wine-dark text-white">
                <a href="/">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Explorar Produtos
                </a>
              </Button>
              <div className="text-sm text-gray-500">
                <a href="/ofertas" className="text-wine hover:text-wine-dark">
                  Ver ofertas especiais
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        {favoriteProducts.length > 0 && (
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-wine mb-4">Dicas dos Favoritos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">💡 Organize sua lista</h4>
                <p>Use os favoritos para criar sua lista de compras recorrentes e economize tempo.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔔 Fique atento às ofertas</h4>
                <p>Produtos favoritos em promoção aparecem destacados na sua lista.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
