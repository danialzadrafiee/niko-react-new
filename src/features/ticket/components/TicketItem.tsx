import React from 'react';
import { TicketData } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tag, Clock } from 'lucide-react';

interface TicketItemProps {
  ticket: TicketData;
  onClick: () => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, onClick }) => {
  return (
    <Card className="cursor-pointer hover:bg-gray-50 rtl shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1" onClick={onClick}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-600">{ticket.title}</CardTitle>
        <CardDescription className="text-gray-600">{ticket.description.substring(0, 100)}...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="flex items-center">
            <Tag className="w-4 h-4 mr-2 text-gray-500" />
            <span className={`px-2 py-1 rounded-full text-sm ${
              ticket.status === 'open' ? 'bg-green-100 text-green-800' :
              ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {ticket.status === 'open' ? 'باز' : ticket.status === 'in_progress' ? 'در حال بررسی' : 'بسته شده'}
            </span>
          </p>
          <p className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 ml-2" />
            {new Date(ticket.created_at).toLocaleDateString('fa-IR')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketItem;