"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { CreditCard, Smartphone, FileText, MapPin, Truck, Shield, Clock, ArrowLeft } from "lucide-react"
import type { Address, PaymentMethod } from "@/types/checkout"
import Link from "next/link"

const paymentMethods: PaymentMethod[] = [
  { id: "credit", type: "credit", name: "Cartão de Crédito", icon: "credit-card" },
  { id: "debit", type: "debit", name: "Cartão de Débito", icon: "credit-card" },
  { id: "pix", type: "pix", name: "PIX", icon: "smartphone" },
  { id: "boleto", type: "boleto", name: "Boleto Bancário", icon: "file-text" },
]

export default function CheckoutPage() {
  const { items, summary, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Address form
  const [address, setAddress] = useState<Address>({
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  })

  // Payment form
  const [selectedPayment, setSelectedPayment] = useState<string>("")
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1",
  })

  useEffect(() => {
    // Redirecionar se não estiver logado ou carrinho vazio
    if (!user) {
      router.push("/login?redirect=/checkout")
      return
    }
    if (items.length === 0) {
      router.push("/carrinho")
      return
    }
  }, [user, items, router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  const handleCardDataChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const validateAddress = () => {
    return (
      address.street &&
      address.number &&
      address.neighborhood &&
      address.city &&
      address.state &&
      address.zipCode.length === 8
    )
  }

  const validatePayment = () => {
    if (!selectedPayment) return false
    if (selectedPayment === "credit" || selectedPayment === "debit") {
      return cardData.number && cardData.name && cardData.expiry && cardData.cvv
    }
    return true
  }

  const handleNextStep = () => {
    if (step === 1 && validateAddress()) {
      setStep(2)
    } else if (step === 2 && validatePayment()) {
      setStep(3)
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleFinishOrder = async () => {
    setIsProcessing(true)

    // Simular processamento do pagamento
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Criar pedido
    const orderId = `FM${Date.now()}`

    // Limpar carrinho
    clearCart()

    // Redirecionar para página de confirmação
    router.push(`/pedido-confirmado?id=${orderId}`)
  }

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2")
  }

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{2})/, "$1/$2")
  }

  if (!user || items.length === 0) {
    return null
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
          <Link href="/carrinho" className="hover:text-wine">
            Carrinho
          </Link>
          <span>/</span>
          <span className="text-wine">Checkout</span>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber ? "wine-primary text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                <span className={`ml-2 text-sm ${step >= stepNumber ? "text-wine font-semibold" : "text-gray-600"}`}>
                  {stepNumber === 1 && "Endereço"}
                  {stepNumber === 2 && "Pagamento"}
                  {stepNumber === 3 && "Confirmação"}
                </span>
                {stepNumber < 3 && <div className="w-8 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-wine">
                    <MapPin className="w-5 h-5 mr-2" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        placeholder="00000-000"
                        value={formatZipCode(address.zipCode)}
                        onChange={(e) => handleAddressChange("zipCode", e.target.value.replace(/\D/g, ""))}
                        maxLength={9}
                      />
                    </div>
                    <div>
                      <Label htmlFor="street">Rua</Label>
                      <Input
                        id="street"
                        placeholder="Nome da rua"
                        value={address.street}
                        onChange={(e) => handleAddressChange("street", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        placeholder="123"
                        value={address.number}
                        onChange={(e) => handleAddressChange("number", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento (opcional)</Label>
                      <Input
                        id="complement"
                        placeholder="Apto, bloco, etc."
                        value={address.complement}
                        onChange={(e) => handleAddressChange("complement", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input
                        id="neighborhood"
                        placeholder="Nome do bairro"
                        value={address.neighborhood}
                        onChange={(e) => handleAddressChange("neighborhood", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        placeholder="Nome da cidade"
                        value={address.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Select value={address.state} onValueChange={(value) => handleAddressChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" asChild>
                      <Link href="/carrinho">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar ao Carrinho
                      </Link>
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!validateAddress()}
                      className="wine-primary hover:wine-dark text-white"
                    >
                      Continuar para Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-wine">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                          {method.icon === "credit-card" && <CreditCard className="w-5 h-5" />}
                          {method.icon === "smartphone" && <Smartphone className="w-5 h-5" />}
                          {method.icon === "file-text" && <FileText className="w-5 h-5" />}
                          <span>{method.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Card Details */}
                  {(selectedPayment === "credit" || selectedPayment === "debit") && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold">Dados do Cartão</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="cardNumber">Número do Cartão</Label>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={formatCardNumber(cardData.number)}
                            onChange={(e) => handleCardDataChange("number", e.target.value.replace(/\D/g, ""))}
                            maxLength={19}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="cardName">Nome no Cartão</Label>
                          <Input
                            id="cardName"
                            placeholder="Nome como está no cartão"
                            value={cardData.name}
                            onChange={(e) => handleCardDataChange("name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/AA"
                            value={formatExpiry(cardData.expiry)}
                            onChange={(e) => handleCardDataChange("expiry", e.target.value.replace(/\D/g, ""))}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => handleCardDataChange("cvv", e.target.value.replace(/\D/g, ""))}
                            maxLength={4}
                          />
                        </div>
                        {selectedPayment === "credit" && (
                          <div className="md:col-span-2">
                            <Label htmlFor="installments">Parcelas</Label>
                            <Select
                              value={cardData.installments}
                              onValueChange={(value) => handleCardDataChange("installments", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1x de {formatPrice(summary.total)} sem juros</SelectItem>
                                <SelectItem value="2">2x de {formatPrice(summary.total / 2)} sem juros</SelectItem>
                                <SelectItem value="3">3x de {formatPrice(summary.total / 3)} sem juros</SelectItem>
                                <SelectItem value="6">6x de {formatPrice(summary.total / 6)} sem juros</SelectItem>
                                <SelectItem value="12">12x de {formatPrice(summary.total / 12)} sem juros</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedPayment === "pix" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Após confirmar o pedido, você receberá o código PIX para pagamento. O pedido será processado
                        após a confirmação do pagamento.
                      </p>
                    </div>
                  )}

                  {selectedPayment === "boleto" && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        O boleto será gerado após a confirmação do pedido. Você terá 3 dias úteis para realizar o
                        pagamento.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      disabled={!validatePayment()}
                      className="wine-primary hover:wine-dark text-white"
                    >
                      Revisar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-wine">Confirmar Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Address Summary */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Endereço de Entrega
                    </h4>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p>
                        {address.street}, {address.number}
                        {address.complement && `, ${address.complement}`}
                      </p>
                      <p>
                        {address.neighborhood}, {address.city} - {address.state}
                      </p>
                      <p>CEP: {formatZipCode(address.zipCode)}</p>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Forma de Pagamento
                    </h4>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p>{paymentMethods.find((p) => p.id === selectedPayment)?.name}</p>
                      {(selectedPayment === "credit" || selectedPayment === "debit") && (
                        <p>**** **** **** {cardData.number.slice(-4)}</p>
                      )}
                      {selectedPayment === "credit" && cardData.installments !== "1" && (
                        <p>{cardData.installments}x sem juros</p>
                      )}
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div>
                    <h4 className="font-semibold mb-2">Itens do Pedido</h4>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-600">
                                {item.quantity}x {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button
                      onClick={handleFinishOrder}
                      disabled={isProcessing}
                      className="wine-primary hover:wine-dark text-white"
                    >
                      {isProcessing ? "Processando..." : "Finalizar Pedido"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({summary.itemCount} itens)</span>
                  <span>{formatPrice(summary.subtotal)}</span>
                </div>

                {summary.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto</span>
                    <span>-{formatPrice(summary.discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span>Frete</span>
                  <span className={summary.shipping === 0 ? "text-green-600" : ""}>
                    {summary.shipping === 0 ? "Grátis" : formatPrice(summary.shipping)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-wine">{formatPrice(summary.total)}</span>
                </div>

                {/* Benefits */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="w-4 h-4 text-wine" />
                    <span>Entrega em até 2 horas</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-wine" />
                    <span>Compra 100% segura</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-wine" />
                    <span>Suporte 24h</span>
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
