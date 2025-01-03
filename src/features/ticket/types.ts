import { User } from "@/types/user"

export interface TicketMessage {
  id: number
  ticket_id: number
  user_id: number
  message: string
  created_at: string
  updated_at: string
  user: User
}

export interface TicketData {
  id: number
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  created_at: string
  updated_at: string
  user: User
  messages: TicketMessage[]
}

export interface CreateTicketData {
  title: string
  description: string
}

export interface UpdateTicketData {
  title?: string
  description?: string
  status?: "open" | "closed" | "in_progress"
}

export interface AddMessageData {
  message: string
}

export interface TicketResponse {
  status: string
  message: string
  payload: TicketData
}

export interface TicketsResponse {
  status: string
  message: string
  payload: TicketData[]
}

export interface MessageResponse {
  status: string
  message: string
  payload: TicketMessage
}
