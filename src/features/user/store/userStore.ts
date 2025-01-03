import { create } from "zustand"
import { User, UserFilters, UsersPaginated } from "../../../types/user"
import { userService } from "../services/userService"
import { userSchema, userUpdateSchema, changeTypeSchema } from "../schemas/userSchema"
import { handleError, showSuccessToast } from "../../../utils/errorHandler"
import { ZodError } from "zod"
import { InvestPaginated } from "@/types/invest"
import { Purchase } from "@/types/purchase"

interface ApiResponse<T> {
  status: string
  message: string
  payload: T
}

interface UserStore {
  users: ApiResponse<UsersPaginated> | null
  currentUser: User | null
  isLoading: boolean
  error: string | null
  validationErrors: Record<string, string>
  fetchUsers: (filters: UserFilters, page?: number, perPage?: number) => Promise<void>
  fetchUserById: (id: number) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  updateUser: any
  changeUserType: (id: number, type: string) => Promise<void>
  validateUser: (userData: Partial<User>, isUpdate?: boolean) => boolean
  setValidationErrors: (errors: Record<string, string>) => void
  clearValidationErrors: () => void
  userInvests: ApiResponse<InvestPaginated> | null
  fetchUserInvests: (userId: number, page?: number, perPage?: number) => Promise<void>
  userPurchases: ApiResponse<Purchase[]> | null
  fetchUserPurchases: (userId: number, page?: number, perPage?: number) => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: null,
  currentUser: null,
  isLoading: false,
  error: null,
  validationErrors: {},
  userInvests: null,
  userPurchases: null,

  fetchUsers: async (filters: UserFilters, page = 1, perPage = 15) => {
    set({ isLoading: true, error: null })
    try {
      const users = await userService.getAllUsers(filters, page, perPage)
      set({ users, isLoading: false })
    } catch (error) {
      handleError(error, "Failed to fetch users")
      set({ error: "Failed to fetch users", isLoading: false })
    }
  },

  fetchUserById: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const user = await userService.getUserById(id)
      set({ currentUser: user, isLoading: false })
    } catch (error) {
      handleError(error, "Failed to fetch user")
      set({ error: "Failed to fetch user", isLoading: false })
    }
  },

  updateUser: async (id: number, userData: FormData) => {
    set({ isLoading: true, error: null })
    try {
      await userService.updateUser(id, userData)
      set(() => ({
        isLoading: false,
      }))
      showSuccessToast(" کاربر با موفقیت به روز رسانی شد")
    } catch (error) {
      console.error(error)
      handleError(error)
      set({ isLoading: false })
    }
  },

  deleteUser: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await userService.deleteUser(id)
      set((state) => ({
        users: state.users
          ? {
              ...state.users,
              payload: {
                ...state.users.payload,
                data: state.users.payload.data.filter((user) => user.id !== id),
              },
            }
          : null,
        isLoading: false,
      }))
      showSuccessToast("User deleted successfully")
    } catch (error) {
      handleError(error, "Failed to delete user")
      set({ error: "Failed to delete user", isLoading: false })
    }
  },

  changeUserType: async (id: number, type: string) => {
    set({ isLoading: true, error: null })
    try {
      changeTypeSchema.parse({ type })
      const updatedUser = await userService.changeUserType(id, type)
      set((state) => ({
        users: state.users
          ? {
              ...state.users,
              payload: {
                ...state.users.payload,
                data: state.users.payload.data.map((user) => (user.id === id ? updatedUser : user)),
              },
            }
          : null,
        currentUser: state.currentUser && state.currentUser.id === id ? updatedUser : state.currentUser,
        isLoading: false,
      }))
      showSuccessToast("User type changed successfully")
    } catch (error) {
      if (error instanceof ZodError) {
        handleError(error, "Invalid type")
      } else {
        handleError(error, "Failed to change user type")
      }
      set({ error: "Failed to change user type", isLoading: false })
    }
  },

  validateUser: (userData: Partial<User>, isUpdate = false) => {
    try {
      const schema = isUpdate ? userUpdateSchema : userSchema
      schema.parse(userData)
      get().clearValidationErrors()
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path.join(".")] = err.message
          }
        })
        get().setValidationErrors(errors)
      }
      return false
    }
  },

  setValidationErrors: (errors: Record<string, string>) => {
    set({ validationErrors: errors })
  },

  clearValidationErrors: () => {
    set({ validationErrors: {} })
  },

  fetchUserInvests: async (userId: number, page = 1, perPage = 10) => {
    set({ isLoading: true, error: null })
    try {
      const invests = await userService.getUserInvests(userId, page, perPage)
      set({ userInvests: invests, isLoading: false })
    } catch (error) {
      handleError(error, "Failed to fetch user invests")
      set({ error: "Failed to fetch user invests", isLoading: false })
    }
  },

  fetchUserPurchases: async (userId: number, page = 1, perPage = 10) => {
    set({ isLoading: true, error: null })
    try {
      const purchases = await userService.getUserPurchases(userId, page, perPage)
      set({ userPurchases: purchases, isLoading: false })
    } catch (error) {
      handleError(error, "Failed to fetch user purchases")
      set({ error: "Failed to fetch user purchases", isLoading: false })
    }
  },
}))
