// src/features/search/services/searchService.ts

import axiosInstance from '@/utils/axiosInstance';
import { handleError } from '@/utils/errorHandler';
import { Fundraise } from '@/types/fundraise';
import { Product } from '@/types/product';

interface SearchResults {
  fundraises: Fundraise[];
  products: Product[];
}

export const searchService = {
  search: async (query: string): Promise<SearchResults> => {
    try {
      const response = await axiosInstance.get<SearchResults>(`/search?query=${query}`);
      return response.data;
    } catch (error) {
      handleError(error, 'Failed to perform search');
      return { fundraises: [], products: [] };
    }
  },
};