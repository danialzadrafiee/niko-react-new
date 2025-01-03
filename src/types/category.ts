// src/types/category.ts

export interface Category {
  id: number
  name: string
  parent_id: number | null
  _lft: number
  _rgt: number
  order: number
  created_at: string
  updated_at: string
  is_selected: boolean
  image: string
  depth: number
  children?: Category[]
}
