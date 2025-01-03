import React, { useEffect, useState } from "react"
import { useUser } from "@/features/user/hooks/useUser"
import { UsersTable } from "./UserTable"
import { ManageUserModal } from "./ManageUserModal"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination"
import { User } from "@/types/user"

const AdminUserList: React.FC = () => {
  const { users, fetchUsers, updateUser } = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const [managingUser, setManagingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers({}, currentPage)
  }, [fetchUsers, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleManageUser = (user: User) => {
    setManagingUser(user)
  }

  const handleUpdateUser = async (userData: Partial<User>) => {
    if (managingUser) {
      await updateUser(managingUser.id, userData)
      setManagingUser(null)
      fetchUsers({}, currentPage)
    }
  }

  const renderPaginationItems = () => {
    const lastPage = users?.payload.last_page || 1
    const items = []

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    )

    // Show ellipsis if there are more than 5 pages and current page is > 3
    if (lastPage > 5 && currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Show 2 pages before and after current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(lastPage - 1, currentPage + 1); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => handlePageChange(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Show ellipsis if there are more than 5 pages and current page is < last page - 2
    if (lastPage > 5 && currentPage < lastPage - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    // Always show last page if it's not the first page
    if (lastPage > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(lastPage)} isActive={currentPage === lastPage}>
            {lastPage}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className="container rounded-lg bg-white shadow mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">لیست کاربران</h1>
      <UsersTable users={users?.payload.data || []} onManageUser={handleManageUser} />
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}>
                قبلی
              </PaginationPrevious>
            ) : (
              <PaginationPrevious className="pointer-events-none opacity-50">
                قبلی
              </PaginationPrevious>
            )}
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            {currentPage < (users?.payload.last_page || 1) ? (
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)}>
                بعدی
              </PaginationNext>
            ) : (
              <PaginationNext className="pointer-events-none opacity-50">
                بعدی
              </PaginationNext>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {managingUser && (
        <ManageUserModal 
          user={managingUser} 
          onClose={() => setManagingUser(null)} 
          onUpdate={handleUpdateUser} 
        />
      )}
    </div>
  )
}

export default AdminUserList