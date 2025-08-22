export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface PaymentMethod {
  id: string
  type: "credit" | "debit" | "pix" | "boleto"
  name: string
  icon: string
}

export interface Order {
  id: string
  userId: string
  items: any[]
  address: Address
  paymentMethod: PaymentMethod
  subtotal: number
  discount: number
  shipping: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  estimatedDelivery: Date
}
