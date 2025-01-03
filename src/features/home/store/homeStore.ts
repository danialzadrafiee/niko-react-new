import { create } from "zustand";
import * as homeService from "../services/homeService";
import { handleError } from "@/utils/errorHandler";
import { HomePageData } from "@/types/home";

interface HomeState {
  homeData: HomePageData | null;
  loading: boolean;
  fetchHomeData: () => Promise<void>;
}

const useHomeStore = create<HomeState>((set) => ({
  homeData: null,
  loading: false,
  fetchHomeData: async () => {
    set({ loading: true });
    try {
      const homeData = await homeService.fetchHomePageData();
      set({ homeData, loading: false });
    } catch (error) {
      handleError(error, "Error fetching home page data");
      set({ loading: false });
    }
  },
}));

export default useHomeStore;