export interface User {
  id: number
  first_name: string
  last_name: string
  meli_code: string | null
  phone: string
  role: "user" | "admin" | "charity"
  status: "active" | "deactive"
  charity_status: "none" | "not_requested" | "requested" | "rejected" | "actived"
  sheba_code: string | null
  card_number: string | null
  social_media_username_fisrt: string | null
  social_media_platform_first: string | null
  social_media_username_second: string | null
  social_media_platform_second: string | null
  charity_reject_reason: string | null
  username: string | null
  email: string | null
  address: string | null
  location: string | null
  badge: string | null
  bio: string | null
  kyc_picture: any | null
  avatar: any | null
  banner: any | null
  created_at: string
  updated_at: string
}

export interface UserFilters {
  name?: string
  phone?: string
  role?: "user" | "seller" | "admin"
}

export interface UsersPaginated {
  data: User[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
