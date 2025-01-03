import { create } from "zustand"
import * as fundraiseService from "@/features/fundraise/services/fundraiseService"
import { handleError, showSuccessToast } from "@/utils/errorHandler"
import { Fundraise } from "@/types/fundraise"

interface FundraiseState {
  fundraises: {
    data: Fundraise[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from?: any
    to?: any
  }
  loading: boolean
  fetchFundraises: (params: any) => Promise<void>
  createFundraise: (data: FormData) => Promise<void>
  updateFundraise: (id: number, data: FormData) => Promise<void>
  deleteFundraise: (id: number) => Promise<void>
}

const useFundraiseStore = create<FundraiseState>((set) => ({
  fundraises: {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  },
  loading: false,

  fetchFundraises: async (params) => {
    set({ loading: true })
    try {
      const fundraises = await fundraiseService.fetchFundraises(params)
      set({ fundraises, loading: false })
    } catch (error) {
      handleError(error, "Error fetching fundraises")
      set({ loading: false })
      throw error
    }
  },

  createFundraise: async (data: FormData) => {
    try {
      const newFundraise = await fundraiseService.createFundraise(data)
      set((state) => ({
        fundraises: {
          ...state.fundraises,
          data: [...state.fundraises.data, newFundraise],
          total: state.fundraises.total + 1,
        },
      }))
      showSuccessToast(" صندوق با موفقیت ایجاد شد")
    } catch (error) {
      handleError(error, "Error creating fundraise")
      throw error
    }
  },

  updateFundraise: async (id, data) => {
    try {
      const updatedFundraise = await fundraiseService.updateFundraise(id, data)
      set((state) => ({
        fundraises: {
          ...state.fundraises,
          data: state.fundraises.data.map((fund) => (fund.id === id ? updatedFundraise : fund)),
        },
      }))
      showSuccessToast("Fundraise updated successfully")
    } catch (error) {
      handleError(error, "Error updating fundraise")
      throw error
    }
  },

  deleteFundraise: async (id) => {
    try {
      await fundraiseService.deleteFundraise(id)
      set((state) => ({
        fundraises: {
          ...state.fundraises,
          data: state.fundraises.data.filter((fund) => fund.id !== id),
          total: state.fundraises.total - 1,
        },
      }))
      showSuccessToast("صندوق حذف شد.")
    } catch (error) {
      handleError(error, "Error deleting fundraise")
      throw error
    }
  },
}))

export default useFundraiseStore
