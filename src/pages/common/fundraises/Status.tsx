// src/pages/common/fundraises/Status.tsx

import React from 'react';
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface StatusProps {
  status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const statusConfig = {
    empty: { icon: CheckCircle, text: 'فعال', color: 'green' },
    live: { icon: CheckCircle, text: 'فعال', color: 'green' },
    dead: { icon: Clock, text: 'منقضی شده', color: 'red' },
    rejected: { icon: XCircle, text: 'رد شده', color: 'red' },
    filled: { icon: CheckCircle, text: 'تکمیل شده', color: 'blue' },
    withdraw_requested: { icon: CheckCircle, text: 'تکمیل شده', color: 'blue' },
    withdraw_done: { icon: CheckCircle, text: 'تکمیل شده', color: 'blue' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.live;
  const Icon = config.icon;

  return (
    <span className={`flex items-center gap-1 text-${config.color}-500 bg-${config.color}-100 px-2 py-1 rounded`}>
      <Icon size={16} />
      {config.text}
    </span>
  );
};

export default Status;