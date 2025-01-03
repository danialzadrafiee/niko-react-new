import { Product } from "./product"
import { User } from "./user"

export interface Purchase {
  id: number
  user_id: number
  product_id: number
  quantity: number
  total_price: number
  created_at: string
  updated_at: string
  user?: User
  product: Product
}

export interface PurchaseStatistics {
  total_purchases: number
  total_revenue: number
  top_products: {
    id: number
    title: string
    purchases_count: number
  }[]
}

export interface CreatePurchaseData {
  product_id: number
  quantity: number
}

export interface PurchaseResponse {
  data: Purchase[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}