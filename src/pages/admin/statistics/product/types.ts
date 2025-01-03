export interface ProductStatistics {
  total_products: number
  total_value: number
  average_price: number
  products_with_no_stock: number
  products_with_low_stock: number
  top_categories: Array<{ id: number; name: string; count: number }>
  highest_priced_product: any
  lowest_priced_product: any
  most_stocked_product: any
  least_stocked_product: any
  recently_added_products: any[]
  total_fundraises: number
  total_invests: number
  total_invest_amount: number
  total_purchases: number
  total_purchase_amount: number
  product_with_most_fundraises: any
  product_with_most_invests: any
  product_with_most_purchases: any
}

export interface SingleProductStatistics {
  id: number
  title: string
  price: number
  balance: number
  category: string
  total_fundraises: number
  total_invests: number
  total_invest_amount: number
  total_purchases: number
  total_purchase_amount: number
  fundraises: Array<{
    title: string
    price_total: number
    price_collected: number
    completion_percentage: number
  }>
}
