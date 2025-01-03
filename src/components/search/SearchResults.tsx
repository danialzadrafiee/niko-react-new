// src/components/search/SearchResults.tsx

import React from 'react';
import { Fundraise } from '@/types/fundraise';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
  fundraises: Fundraise[];
  products: Product[];
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ fundraises, products, onClose }) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg z-50">
      {fundraises.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Fundraises</h3>
          <ul>
            {fundraises.map((fundraise) => (
              <li key={fundraise.id} className="mb-2">
                <Link to={`/fundraises/${fundraise.id}`} onClick={onClose} className="hover:text-blue-600">
                  {fundraise.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {products.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="mb-2">
                <Link to={`/products/${product.id}`} onClick={onClose} className="hover:text-blue-600">
                  {product.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {fundraises.length === 0 && products.length === 0 && (
        <div className="p-4 text-center text-gray-500">No results found</div>
      )}
    </div>
  );
};

export default SearchResults;