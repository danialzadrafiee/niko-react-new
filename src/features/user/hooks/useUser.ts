import { useCallback } from "react"
import { useUserStore } from "../store/userStore"
import { User, UserFilters } from "../../../types/user"

export const useUser = () => {
  const { users, currentUser, isLoading, error, validationErrors, fetchUsers, fetchUserById, updateUser, deleteUser, validateUser, clearValidationErrors } = useUserStore()

  const handleFetchUsers = useCallback(
    async (filters: UserFilters, page = 1, perPage = 15) => {
      await fetchUsers(filters, page, perPage)
    },
    [fetchUsers]
  )

  const handleFetchUserById = useCallback(
    async (id: number) => {
      await fetchUserById(id)
    },
    [fetchUserById]
  )

  const handleUpdateUser = useCallback(
    async (id: number, userData: Partial<User>) => {
      return await updateUser(id, userData)
    },
    [updateUser]
  )

  const handleDeleteUser = useCallback(
    async (id: number) => {
      await deleteUser(id)
    },
    [deleteUser]
  )

  return {
    users,
    currentUser,
    isLoading,
    error,
    validationErrors,
    fetchUsers: handleFetchUsers,
    fetchUserById: handleFetchUserById,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    validateUser,
    clearValidationErrors,
  }
}
