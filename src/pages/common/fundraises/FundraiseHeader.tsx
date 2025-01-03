import React from 'react';
import { MapPin } from "lucide-react";
import { getImageUrl } from '@/utils/env';

interface FundraiseHeaderProps {
  picture: string;
  title: string;
  location: string;
}

const FundraiseHeader: React.FC<FundraiseHeaderProps> = ({ picture, title, location }) => {
  return (
    <main className="grid gap-2 rounded-xl pb-8 shadow">
      <header className="relative">
        <img src={getImageUrl(picture)} className="h-[160px] w-full object-cover rounded-t-2xl" alt={title} />
        <div className="absolute bg-[#edf5e6] top-4 flex items-center pr-0.5 right-4 rounded-full h-[30px]"></div>
      </header>
      <div className="w-full flex items-center relative z-[2] justify-center -mt-[46px]">
        <img src={getImageUrl(picture)} className="rounded-xl border-2 border-[#FAFAFB] size-[70px]" alt={title} />
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold">{title}</div>
          <div className="flex gap-2 text-sm text-[#92929D] items-center justify-center">
            <MapPin size={16} />
            <div>{location}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FundraiseHeader;