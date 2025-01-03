import { create } from 'zustand';
import * as carouselService from '../services/carouselService';
import { handleError, showSuccessToast } from '@/utils/errorHandler';

interface CarouselItem {
  id: number;
  image: string;
  route_link: string;
  order: number;
}

interface CarouselState {
  carouselItems: CarouselItem[];
  loading: boolean;
  fetchCarouselItems: () => Promise<void>;
  createCarouselItem: (data: Partial<CarouselItem>) => Promise<void>;
  updateCarouselItem: (id: number, data: Partial<CarouselItem>) => Promise<void>;
  deleteCarouselItem: (id: number) => Promise<void>;
}

const useCarouselStore = create<CarouselState>((set) => ({
  carouselItems: [],
  loading: false,
  fetchCarouselItems: async () => {
    set({ loading: true });
    try {
      const items = await carouselService.fetchCarouselItems();
      set({ carouselItems: items, loading: false });
    } catch (error) {
      handleError(error, 'Error fetching carousel items');
      set({ loading: false });
    }
  },
  createCarouselItem: async (data) => {
    try {
      const newItem = await carouselService.createCarouselItem(data);
      set((state) => ({ carouselItems: [...state.carouselItems, newItem] }));
      showSuccessToast('Carousel item created successfully');
    } catch (error) {
      handleError(error, 'Error creating carousel item');
    }
  },
  updateCarouselItem: async (id, data) => {
    try {
      const updatedItem = await carouselService.updateCarouselItem(id, data);
      set((state) => ({
        carouselItems: state.carouselItems.map((item) =>
          item.id === id ? updatedItem : item
        ),
      }));
      showSuccessToast('Carousel item updated successfully');
    } catch (error) {
      handleError(error, 'Error updating carousel item');
    }
  },
  deleteCarouselItem: async (id) => {
    try {
      await carouselService.deleteCarouselItem(id);
      set((state) => ({
        carouselItems: state.carouselItems.filter((item) => item.id !== id),
      }));
      showSuccessToast('Carousel item deleted successfully');
    } catch (error) {
      handleError(error, 'Error deleting carousel item');
    }
  },
}));

export default useCarouselStore;