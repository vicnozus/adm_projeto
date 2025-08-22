export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  originalPrice?: number
  image: string
  brand: string
  unit: string
  weight?: string
  quantity: number
  maxQuantity: number
}

export interface CartSummary {
  subtotal: number
  discount: number
  shipping: number
  total: number
  itemCount: number
}
