import axiosInstance from "../../../utils/axiosInstance"
import { TicketData, TicketMessage, CreateTicketData, UpdateTicketData, TicketResponse, TicketsResponse, MessageResponse } from "../types"

export const ticketService = {
  getAllTickets: async (): Promise<TicketData[]> => {
    const response = await axiosInstance.get<TicketsResponse>("/tickets")
    return response.data.payload
  },

  createTicket: async (ticketData: CreateTicketData): Promise<TicketData> => {
    const response = await axiosInstance.post<TicketResponse>("/tickets", ticketData)
    return response.data.payload
  },

  getTicket: async (id: number): Promise<TicketData> => {
    const response = await axiosInstance.get<TicketResponse>(`/tickets/${id}`)
    return response.data.payload
  },

  updateTicket: async (id: number, ticketData: UpdateTicketData): Promise<TicketData> => {
    const response = await axiosInstance.put<TicketResponse>(`/tickets/${id}`, ticketData)
    return response.data.payload
  },

  deleteTicket: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/tickets/${id}`)
  },

  addMessage: async (ticketId: number, message: string): Promise<TicketMessage> => {
    const response = await axiosInstance.post<MessageResponse>(`/tickets/${ticketId}/messages`, { message })
    return response.data.payload
  },
}
