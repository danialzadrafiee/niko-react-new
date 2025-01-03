import { useTicketStore } from '../store/ticketStore';

export const useTickets = () => {
  const {
    tickets,
    currentTicket,
    loading,
    error,
    fetchTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket,
    addMessage,
  } = useTicketStore();

  return {
    tickets,
    currentTicket,
    loading,
    error,
    fetchTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket,
    addMessage,
  };
};