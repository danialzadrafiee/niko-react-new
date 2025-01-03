import React, { useState } from 'react';
import TicketList from '../../../features/ticket/components/TicketList';
import TicketForm from '../../../features/ticket/components/TicketForm';
import TicketDetail from '../../../features/ticket/components/TicketDetail';

const UserTickets: React.FC = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  return (
    <div dir='rtl' className="container  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">تیکت های من</h1>
      {!selectedTicketId ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4"> ساخت تیکت جدید</h2>
            <TicketForm />
          </div>
          <TicketList onTicketSelect={setSelectedTicketId} />
        </>
      ) : (
        <>
          <button onClick={() => setSelectedTicketId(null)} className="mb-4 px-4 py-2 bg-gray-300 rounded">بازگشت</button>
          <TicketDetail ticketId={selectedTicketId} isAdmin={false} />
        </>
      )}
    </div>
  );
};

export default UserTickets;