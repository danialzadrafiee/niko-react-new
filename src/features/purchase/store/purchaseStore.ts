import { create } from "zustand"
import * as purchaseService from "@/features/purchase/services/purchaseService"
import { handleError, showSuccessToast } from "@/utils/errorHandler"
import { Purchase } from "@/types/purchase"

interface PurchaseState {
  purchases: {
    data: Purchase[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  statistics: any
  loading: boolean
  createPurchase: (productId: number, quantity: number) => Promise<void>
  fetchPurchaseHistory: (page?: number, perPage?: number) => Promise<void>
  fetchPurchaseStatistics: () => Promise<void>
}

const usePurchaseStore = create<PurchaseState>((set) => ({
  purchases: {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  },
  statistics: null,
  loading: false,

  createPurchase: async (productId, quantity) => {
    try {
      const newPurchase = await purchaseService.createPurchase({ product_id: productId, quantity })
      set((state) => ({
        purchases: {
          ...state.purchases,
          data: [newPurchase, ...state.purchases.data],
          total: state.purchases.total + 1,
        },
      }))
      showSuccessToast("خرید شما با موفقیت انجام شد")
    } catch (error) {
      handleError(error)
      throw error
    }
  },

  fetchPurchaseHistory: async (page = 1, perPage = 10) => {
    set({ loading: true })
    try {
      const purchases = await purchaseService.fetchPurchaseHistory(page, perPage)
      set({ purchases, loading: false })
    } catch (error) {
      handleError(error, "Error fetching purchase history")
      set({ loading: false })
      throw error
    }
  },

  fetchPurchaseStatistics: async () => {
    set({ loading: true })
    try {
      const statistics = await purchaseService.fetchPurchaseStatistics()
      set({ statistics, loading: false })
    } catch (error) {
      handleError(error)
      set({ loading: false })
      throw error
    }
  },
}))

export default usePurchaseStore
