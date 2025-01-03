import React, { useState } from "react"
import TicketList from "../../../features/ticket/components/TicketList"
import TicketDetail from "../../../features/ticket/components/TicketDetail"

const AdminTickets: React.FC = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">تمام تیکت ها</h1>
      {!selectedTicketId ? (
        <TicketList onTicketSelect={setSelectedTicketId} />
      ) : (
        <>
          <button onClick={() => setSelectedTicketId(null)} className="mb-4 px-4 py-2 bg-gray-300 rounded">
            بازگشت{" "}
          </button>
          <TicketDetail ticketId={selectedTicketId} isAdmin={true} />
        </>
      )}
    </div>
  )
}

export default AdminTickets
