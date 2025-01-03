import { create } from "zustand"
import { ticketService } from "../services/ticketService"
import { CreateTicketData, TicketData, UpdateTicketData } from "../types"

interface TicketStore {
  tickets: TicketData[]
  currentTicket: TicketData | null
  loading: boolean
  error: string | null
  fetchTickets: () => Promise<void>
  createTicket: (ticketData: CreateTicketData) => Promise<void>
  getTicket: (id: number) => Promise<void>
  updateTicket: (id: number, ticketData: UpdateTicketData) => Promise<void>
  deleteTicket: (id: number) => Promise<void>
  addMessage: (ticketId: number, message: string) => Promise<void>
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
  fetchTickets: async () => {
    set({ loading: true, error: null })
    try {
      const tickets = await ticketService.getAllTickets()
      set({ tickets, loading: false })
    } catch (error) {
      set({ error: "Failed to fetch tickets", loading: false })
    }
  },
  createTicket: async (ticketData) => {
    set({ loading: true, error: null })
    try {
      const newTicket = await ticketService.createTicket(ticketData)
      set((state) => ({ tickets: [...state.tickets, newTicket], loading: false }))
    } catch (error) {
      set({ error: "Failed to create ticket", loading: false })
    }
  },
  getTicket: async (id) => {
    set({ loading: true, error: null })
    try {
      const ticket = await ticketService.getTicket(id)
      set({ currentTicket: ticket, loading: false })
    } catch (error) {
      set({ error: "Failed to fetch ticket", loading: false })
    }
  },
  updateTicket: async (id, ticketData) => {
    set({ loading: true, error: null })
    try {
      const updatedTicket = await ticketService.updateTicket(id, ticketData)
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === id ? updatedTicket : t)),
        currentTicket: updatedTicket,
        loading: false,
      }))
    } catch (error) {
      set({ error: "Failed to update ticket", loading: false })
    }
  },
  deleteTicket: async (id) => {
    set({ loading: true, error: null })
    try {
      await ticketService.deleteTicket(id)
      set((state) => ({
        tickets: state.tickets.filter((t) => t.id !== id),
        loading: false,
      }))
    } catch (error) {
      set({ error: "Failed to delete ticket", loading: false })
    }
  },
  addMessage: async (ticketId, message) => {
    set({ loading: true, error: null })
    try {
      const newMessage = await ticketService.addMessage(ticketId, message)
      set((state) => ({
        currentTicket: state.currentTicket
          ? {
              ...state.currentTicket,
              messages: [...(state.currentTicket.messages || []), newMessage],
            }
          : null,
        loading: false,
      }))
    } catch (error) {
      set({ error: "Failed to add message", loading: false })
    }
  },
}))
