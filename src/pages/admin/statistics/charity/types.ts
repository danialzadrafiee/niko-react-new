export interface CharityStatistics {
  charity_id: string
  charity_name: string | null
  total_fundraises: number
  live_fundraises: number
  completed_fundraises: number
  total_amount_raised: number
  total_goal_amount: number
  average_completion_percentage: number
  total_investors: number
  total_investments: number
  average_donation_amount: number
  largest_single_donation: number
  smallest_single_donation: number
  most_successful_fundraise: Fundraise
  least_successful_fundraise: Fundraise
  top_fundraises: Fundraise[]
}

export interface Fundraise {
  id: number
  title: string
  describe: string
  amount: number
  price_per_single_product: number
  price_total: number
  status: "empty" | "live" | "dead" | "rejected" | "filled" | "withdraw_requested" | "withdraw_done"
  picture: string
  deadline: string
  price_collected: number
  remaining_amount: number
  completion_percentage: number
  product: Product
  invests: Invest[]
}

export interface Product {
  id: number
  title: string
  balance: number
  price: number
  describe: string
  location: string
  picture: string
  category: {
    id: number
    name: string
  }
}

export interface Invest {
  id: number
  investor_id: number
  amount: number
  anonymous: boolean
  created_at: string
}
