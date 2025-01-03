import { create } from "zustand";
import * as investService from "../services/investService";
import { handleError, showSuccessToast } from "@/utils/errorHandler";
import { Invest, CreateInvestData } from "@/types/invest";

interface InvestState {
  currentInvest: Invest | null;
  loading: boolean;
  createInvest: (data: CreateInvestData) => Promise<void>;
  fetchInvest: (id: number) => Promise<void>;
}

const useInvestStore = create<InvestState>((set) => ({
  currentInvest: null,
  loading: false,

  createInvest: async (data: CreateInvestData) => {
    set({ loading: true });
    try {
      const newInvest = await investService.createInvest(data);
      set({ currentInvest: newInvest, loading: false });
      showSuccessToast("حمایت با موفقیت انجام شد");
    } catch (error) {
      handleError(error, "Error creating investment");
      set({ loading: false });
      throw error;
    }
  },

  fetchInvest: async (id: number) => {
    set({ loading: true });
    try {
      const invest = await investService.fetchInvest(id);
      set({ currentInvest: invest, loading: false });
    } catch (error) {
      handleError(error, "Error fetching investment");
      set({ loading: false });
      throw error;
    }
  },
}));

export default useInvestStore;