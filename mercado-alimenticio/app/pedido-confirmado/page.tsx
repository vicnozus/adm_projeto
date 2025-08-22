"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Clock, Home, ShoppingBag } from "lucide-react"

export default function OrderConfirmedPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date>()

  useEffect(() => {
    // Calcular data estimada de entrega (2 horas a partir de agora)
    const delivery = new Date()
    delivery.setHours(delivery.getHours() + 2)
    setEstimatedDelivery(delivery)
  }, [])

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="wine-primary w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Pedido Confirmado!</h1>
          <p className="text-gray-600 mb-8">
            Seu pedido foi realizado com sucesso e já está sendo preparado. Você receberá atualizações por email.
          </p>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-wine">Detalhes do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Número do Pedido:</span>
                <span className="text-wine font-mono">{orderId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Data do Pedido:</span>
                <span>{formatDate(new Date())}</span>
              </div>

              {estimatedDelivery && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Entrega Estimada:</span>
                  <span className="text-green-600 font-semibold">{formatDate(estimatedDelivery)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-wine">Status do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center space-y-2">
                  <div className="wine-primary w-12 h-12 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-wine">Confirmado</span>
                </div>

                <div className="flex-1 h-px bg-gray-300 mx-4"></div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="wine-primary w-12 h-12 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-wine">Preparando</span>
                </div>

                <div className="flex-1 h-px bg-gray-300 mx-4"></div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-500">A Caminho</span>
                </div>

                <div className="flex-1 h-px bg-gray-300 mx-4"></div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-500">Entregue</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-wine">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-wine mt-0.5" />
                <div>
                  <p className="font-semibold">Preparação do Pedido</p>
                  <p className="text-sm text-gray-600">
                    Nossa equipe está separando seus produtos com todo cuidado e atenção.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-wine mt-0.5" />
                <div>
                  <p className="font-semibold">Entrega</p>
                  <p className="text-sm text-gray-600">
                    Você receberá uma notificação quando o entregador estiver a caminho.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-wine mt-0.5" />
                <div>
                  <p className="font-semibold">Confirmação</p>
                  <p className="text-sm text-gray-600">Após a entrega, você poderá avaliar os produtos e o serviço.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="wine-primary hover:wine-dark text-white">
                <Link href="/pedidos">Ver Meus Pedidos</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-wine text-wine hover:wine-primary hover:text-white bg-transparent"
              >
                <Link href="/">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Link>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Dúvidas? Entre em contato conosco pelo{" "}
              <Link href="/contato" className="text-wine hover:text-wine-dark">
                atendimento
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
