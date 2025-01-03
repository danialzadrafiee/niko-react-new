import React, { useEffect } from 'react';
import { useTickets } from '../hooks/useTickets';
import TicketItem from './TicketItem';
import { Inbox } from 'lucide-react';

interface TicketListProps {
  onTicketSelect: (ticketId: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({ onTicketSelect }) => {
  const { tickets, loading, error, fetchTickets } = useTickets();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  if (loading) return <div className="text-right text-gray-600">در حال بارگذاری...</div>;
  if (error) return <div className="text-right text-red-500">خطا: {error}</div>;

  return (
    <div className="space-y-4 rtl">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
        <Inbox className="w-6 h-6 ml-2" />
        تیکت‌ها
      </h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500 text-center py-8">هیچ تیکتی موجود نیست.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} onClick={() => onTicketSelect(ticket.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;