import { Invest } from "./invest"
import { Product } from "./product"

export interface Fundraise {
  id: number
  owner_id: number
  product_id: number
  title: string
  describe: string
  amount: number
  price_collected: number
  completion_percentage: number
  invests: Invest[]
  price_per_single_product: number
  price_total: number
  picture: string
  deadline: string
  remaining_amount: number
  status: "empty" | "live" | "dead" | "rejected" | "filled" | "withdraw_requested" | "withdraw_done"
  created_at: string
  updated_at: string
  product: Product
}


