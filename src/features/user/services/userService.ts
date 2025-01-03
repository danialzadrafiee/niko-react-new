import axiosInstance from "../../../utils/axiosInstance"
import { handleError } from "../../../utils/errorHandler"
import { UserFilters } from "../../../types/user"

export const userService = {
  getAllUsers: async (filters: UserFilters, page: number = 1, perPage: number = 15) => {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          ...filters,
          page,
          per_page: perPage,
        },
      })
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch users")
      throw error
    }
  },

  getUserById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`)
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch user")
      throw error
    }
  },

  updateUser: async (id: number, userData: Record<string, any> | FormData) => {
    try {
      let formData: FormData;
      if (!(userData instanceof FormData)) {
        formData = new FormData();
        Object.keys(userData).forEach(key => {
          if (userData[key] !== null && userData[key] !== undefined && userData[key] !== '') {
            formData.append(key, userData[key]);
          }
        });
      } else {
        formData = new FormData();
        for (const [key, value] of userData.entries()) {
          if (value !== null && value !== undefined && value !== '') {
            formData.append(key, value);
          }
        }
      }
      formData.append('_method', 'PUT');
      const response = await axiosInstance.post(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in userService.updateUser:", error);
    }
  },


  
  deleteUser: async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`)
      return response.data
    } catch (error) {
      handleError(error, "Failed to delete user")
      throw error
    }
  },

  changeUserType: async (id: number, type: string) => {
    try {
      const response = await axiosInstance.post(`/users/${id}/change-type`, { type })
      return response.data
    } catch (error) {
      handleError(error, "Failed to change user type")
      throw error
    }
  },

  getUserInvests: async (userId: number, page: number = 1, perPage: number = 10) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/invests`, {
        params: {
          page,
          per_page: perPage,
        },
      })
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch user invests")
      throw error
    }
  },

  getUserPurchases: async (userId: number, page: number = 1, perPage: number = 10) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/purchases`, {
        params: {
          page,
          per_page: perPage,
        },
      })
      return response.data
    } catch (error) {
      handleError(error, "Failed to fetch user purchases")
      throw error
    }
  },
}
