import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Clock, Star } from "lucide-react"

export default function HomePage() {
  const categories = [
    { name: "Frutas", image: "/fresh-fruits.png", href: "/categorias/frutas" },
    { name: "Verduras", image: "/fresh-vegetables.png", href: "/categorias/verduras" },
    { name: "Carnes", image: "/fresh-meat.png", href: "/categorias/carnes" },
    { name: "Laticínios", image: "/assorted-dairy.png", href: "/categorias/laticinios" },
    { name: "Padaria", image: "/bakery-bread-display.png", href: "/categorias/padaria" },
    { name: "Bebidas", image: "/assorted-beverages.png", href: "/categorias/bebidas" },
  ]

  const featuredProducts = [
    {
      name: "Maçã Gala",
      price: "R$ 8,90",
      originalPrice: "R$ 12,90",
      image: "/red-apple.png",
      discount: "31%",
    },
    {
      name: "Banana Prata",
      price: "R$ 4,50",
      originalPrice: "R$ 6,90",
      image: "/banana-bunch.png",
      discount: "35%",
    },
    {
      name: "Tomate Italiano",
      price: "R$ 7,90",
      originalPrice: "R$ 9,90",
      image: "/italian-tomatoes.png",
      discount: "20%",
    },
    {
      name: "Leite Integral",
      price: "R$ 4,99",
      originalPrice: "R$ 6,49",
      image: "/milk-carton.png",
      discount: "23%",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="wine-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Produtos Frescos
                <span className="block text-gray-200">Direto na Sua Mesa</span>
              </h1>
              <p className="text-xl text-gray-200">
                Qualidade garantida, preços justos e entrega rápida. Descubra a diferença de comprar no FreshMarket.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-wine hover:bg-gray-100 font-semibold px-8 py-3">
                  Começar a Comprar
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-wine px-8 py-3 bg-transparent"
                >
                  Ver Ofertas
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/fresh-grocery-basket.png"
                alt="Cesta de produtos frescos"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Receba em até 2 horas na sua casa</p>
            </div>
            <div className="text-center">
              <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">Produtos frescos e selecionados</p>
            </div>
            <div className="text-center">
              <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24h Disponível</h3>
              <p className="text-gray-600">Compre quando quiser, onde estiver</p>
            </div>
            <div className="text-center">
              <div className="wine-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Melhor Preço</h3>
              <p className="text-gray-600">Ofertas exclusivas todos os dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wine mb-4">Nossas Categorias</h2>
            <p className="text-gray-600 text-lg">Encontre tudo que você precisa para sua casa</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                    />
                    <h3 className="font-semibold text-wine group-hover:text-wine-dark">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wine mb-4">Ofertas da Semana</h2>
            <p className="text-gray-600 text-lg">Produtos selecionados com os melhores preços</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.name} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 right-2 wine-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                      -{product.discount}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-wine">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>
                  <Button className="w-full wine-primary hover:wine-dark text-white">Adicionar ao Carrinho</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-wine text-wine hover:wine-primary hover:text-white bg-transparent"
            >
              Ver Todas as Ofertas
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
