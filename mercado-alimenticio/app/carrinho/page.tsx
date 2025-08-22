"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Shield, Clock } from "lucide-react"

export default function CartPage() {
  const { items, summary, updateQuantity, removeItem, clearCart } = useCart()
  const { user } = useAuth()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity)
  }

  const handleApplyCoupon = () => {
    // Simular aplicação de cupom
    if (couponCode.toLowerCase() === "desconto10") {
      setAppliedCoupon("DESCONTO10")
      setCouponCode("")
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="wine-primary w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <ShoppingBag className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-8">Adicione produtos ao seu carrinho para continuar comprando.</p>
            <div className="space-y-4">
              <Button asChild size="lg" className="wine-primary hover:wine-dark text-white">
                <Link href="/">Continuar Comprando</Link>
              </Button>
              <div className="text-sm text-gray-500">
                <Link href="/ofertas" className="text-wine hover:text-wine-dark">
                  Ver ofertas especiais
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-wine">
            Início
          </Link>
          <span>/</span>
          <span className="text-wine">Carrinho</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-serif text-wine">
                  Meu Carrinho ({summary.itemCount} {summary.itemCount === 1 ? "item" : "itens"})
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Limpar carrinho
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.weight} • {item.brand}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-wine">{formatPrice(item.price)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-semibold text-wine min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.productId)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                      {item.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Button
                variant="outline"
                asChild
                className="border-wine text-wine hover:wine-primary hover:text-white bg-transparent"
              >
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cupom de Desconto</CardTitle>
              </CardHeader>
              <CardContent>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-semibold text-green-800">{appliedCoupon}</p>
                      <p className="text-sm text-green-600">Cupom aplicado com sucesso!</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleRemoveCoupon} className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Input
                      placeholder="Digite seu cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                      className="w-full bg-transparent"
                    >
                      Aplicar Cupom
                    </Button>
                    <p className="text-xs text-gray-500">Experimente: DESCONTO10</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({summary.itemCount} itens)</span>
                  <span>{formatPrice(summary.subtotal)}</span>
                </div>

                {summary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>-{formatPrice(summary.discount)}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Cupom {appliedCoupon}</span>
                    <span>-{formatPrice(summary.subtotal * 0.1)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className={summary.shipping === 0 ? "text-green-600" : ""}>
                    {summary.shipping === 0 ? "Grátis" : formatPrice(summary.shipping)}
                  </span>
                </div>

                {summary.subtotal < 150 && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Adicione mais {formatPrice(150 - summary.subtotal)} para ganhar frete grátis!
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-wine">
                      {formatPrice(summary.total - (appliedCoupon ? summary.subtotal * 0.1 : 0))}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  {user ? (
                    <Button asChild size="lg" className="w-full wine-primary hover:wine-dark text-white">
                      <Link href="/checkout">Finalizar Compra</Link>
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button asChild size="lg" className="w-full wine-primary hover:wine-dark text-white">
                        <Link href="/login?redirect=/checkout">Fazer Login e Finalizar</Link>
                      </Button>
                      <p className="text-xs text-center text-gray-500">
                        Ou{" "}
                        <Link href="/registro" className="text-wine hover:text-wine-dark">
                          cadastre-se
                        </Link>{" "}
                        para continuar
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="wine-primary w-8 h-8 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Entrega Rápida</p>
                      <p className="text-xs text-gray-600">Receba em até 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="wine-primary w-8 h-8 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Compra Segura</p>
                      <p className="text-xs text-gray-600">Seus dados protegidos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="wine-primary w-8 h-8 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Suporte 24h</p>
                      <p className="text-xs text-gray-600">Estamos sempre aqui</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
