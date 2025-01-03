// src/components/shared/ShopCard.tsx

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getImageUrl } from '@/utils/env';

interface ShopCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  price?: number;
  priceCollected?: number;
  priceTotal?: number;
  deadline?: string;
  balance?: number;
  location?: string;
  category?: string;
  onViewDetails: (id: number) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({
  id,
  title,
  image,
  description,
  price,
  priceCollected,
  priceTotal,
  deadline,
  balance,
  location,
  category,
  onViewDetails
}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <img src={getImageUrl(image)} alt={title} className="w-full h-48 object-cover mb-4" />
        <div className="text-sm text-gray-600 mb-2">{description}</div>
        {price !== undefined && <div className="font-semibold">Price: ${price}</div>}
        {priceCollected !== undefined && priceTotal !== undefined && (
          <>
            <div className="font-semibold" dir="ltr">
              ${priceCollected} raised of ${priceTotal} goal
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(priceCollected / priceTotal) * 100}%` }}></div>
            </div>
          </>
        )}
        {balance !== undefined && <div>Balance: {balance}</div>}
        {location && <div>Location: {location}</div>}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {deadline && <span className="text-sm text-gray-600">Ends on {new Date(deadline).toLocaleDateString()}</span>}
        {category && <span className="text-sm text-gray-600">Category: {category}</span>}
        <Button onClick={() => onViewDetails(id)}>View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ShopCard;