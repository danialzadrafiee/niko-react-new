import { create } from "zustand"
import * as productService from "@/features/product/services/productService"
import { handleError, showSuccessToast } from "@/utils/errorHandler"
import { Product } from "@/types/product"

interface ProductState {
  products: {
    data: Product[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from?: any
    to?: any
  }
  loading: boolean
  fetchProduct(id: number): Promise<Product>
  fetchProducts: (params: any) => Promise<void>
  createProduct: (data: FormData) => Promise<void>
  updateProduct: (id: number, data: Partial<Product>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
}

const useProductStore = create<ProductState>((set) => ({
  products: {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0,
  },
  loading: false,

  fetchProduct: async (id: number) => {
    set({ loading: true })
    try {
      const product = await productService.fetchProduct(id)
      set({ loading: false })
      return product
    } catch (error) {
      handleError(error, " خطا در ارتباط با سرور")
      set({ loading: false })
      throw error
    }
  },

  fetchProducts: async (params) => {
    set({ loading: true })
    try {
      const products = await productService.fetchProducts(params)
      set({ products, loading: false })
    } catch (error) {
      handleError(error, " خطا در ارتباط با سرور")
      set({ loading: false })
      throw error
    }
  },

  createProduct: async (data: FormData) => {
    try {
      const newProduct = await productService.createProduct(data)
      set((state) => ({
        products: {
          ...state.products,
          data: [...state.products.data, newProduct],
          total: state.products.total + 1,
        },
      }))
      showSuccessToast(" خدمت با موفقیت ایجاد شد")
    } catch (error) {
      handleError(error, " خطا در ارتباط با سرور")
      throw error
    }
  },

  updateProduct: async (id, data) => {
    try {
      const updatedProduct = await productService.updateProduct(id, data as any)
      set((state) => ({
        products: {
          ...state.products,
          data: state.products.data.map((prod) => (prod.id === id ? updatedProduct : prod)),
        },
      }))
      showSuccessToast("خدمت با موفقیت ویرایش شد")
    } catch (error) {
      handleError(error, "Error updating product")
      throw error
    }
  },

  deleteProduct: async (id) => {
    try {
      await productService.deleteProduct(id)
      set((state) => ({
        products: {
          ...state.products,
          data: state.products.data.filter((prod) => prod.id !== id),
          total: state.products.total - 1,
        },
      }))
      showSuccessToast(" خدمت با موفقیت حذف شد")
    } catch (error) {
      handleError(error, " خطا در ارتباط با سرور")
      throw error
    }
  },
}))

export default useProductStore
