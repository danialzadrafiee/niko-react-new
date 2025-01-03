import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types/user"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, SortingState, getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import axiosInstance from "@/utils/axiosInstance"
import UserChangeHistoryTable from "./UserChangeHistoryTable"

interface UsersTableProps {
  users: User[]
  onManageUser: (user: User) => void
}

const translateUserRole = (role: string) => {
  switch (role) {
    case "user":
      return "کاربر"
    case "admin":
      return "مدیر"
    case "charity":
      return "خیریه"
    default:
      return role
  }
}

const translateStatus = (status: string) => {
  switch (status) {
    case "active":
      return "فعال"
    case "deactive":
      return "غیرفعال"
    default:
      return status
  }
}

const translateCharityStatus = (status: string) => {
  switch (status) {
    case "none":
      return "هیچ"
    case "not_requested":
      return "درخواست نشده"
    case "requested":
      return "درخواست شده"
    case "rejected":
      return "رد شده"
    case "actived":
      return "فعال شده"
    default:
      return status
  }
}

const getCharityStatusBadge = (status: string) => {
  const colors = {
    none: "bg-gray-500",
    not_requested: "bg-yellow-500",
    requested: "bg-blue-500",
    rejected: "bg-red-500",
    actived: "bg-green-500",
  }
  return <Badge className={`${colors[status as keyof typeof colors]} text-white`}>{translateCharityStatus(status)}</Badge>
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, onManageUser }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [showOnlyCharity, setShowOnlyCharity] = React.useState(false)
  const [userChangeHistory, setUserChangeHistory] = useState<any[]>([])
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const fetchUserChangeHistory = async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/record`)
      console.log(response.data)
      setUserChangeHistory(response.data)
    } catch (error) {
      console.error("Error fetching user change history:", error)
    }
  }

  const handleShowHistory = (userId: number) => {
    console.log(userId)
    fetchUserChangeHistory(userId)
    setIsHistoryDialogOpen(true)
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "first_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          نام
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          نام خانوادگی
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "meli_code",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          کد ملی
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          شماره تلفن
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          نقش
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => translateUserRole(row.getValue("role")),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          وضعیت
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => translateStatus(row.getValue("status")),
    },
    {
      accessorKey: "charity_status",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          وضعیت خیریه
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => getCharityStatusBadge(row.getValue("charity_status")),
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          نام کاربری
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ایمیل
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => onManageUser(row.original)}>مدیریت</Button>
          <Button onClick={() => handleShowHistory(row.original.id)}>تاریخچه تغییرات</Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  React.useEffect(() => {
    if (showOnlyCharity) {
      table.getColumn("role")?.setFilterValue("charity")
    } else {
      table.getColumn("role")?.setFilterValue("")
    }
  }, [showOnlyCharity, table])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Switch id="show-charity" checked={showOnlyCharity} onCheckedChange={setShowOnlyCharity} />
          <label htmlFor="show-charity">نمایش فقط خیریه‌ها</label>
        </div>
        <Input placeholder="فیلتر بر اساس نام" value={(table.getColumn("first_name")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("first_name")?.setFilterValue(event.target.value)} className="max-w-sm" />
        <div className="flex gap-4">
          <Select value={(table.getColumn("role")?.getFilterValue() as string) ?? "all"} onValueChange={(value) => table.getColumn("role")?.setFilterValue(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="نقش" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه نقش‌ها</SelectItem>
              <SelectItem value="admin">مدیر</SelectItem>
              <SelectItem value="user">کاربر</SelectItem>
              <SelectItem value="charity">خیریه</SelectItem>
            </SelectContent>
          </Select>
          <Select value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"} onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="deactive">غیرفعال</SelectItem>
            </SelectContent>
          </Select>
          <Select value={(table.getColumn("charity_status")?.getFilterValue() as string) ?? "all"} onValueChange={(value) => table.getColumn("charity_status")?.setFilterValue(value === "all" ? "" : value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="وضعیت خیریه" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه وضعیت‌ها</SelectItem>
              <SelectItem value="none">هیچ</SelectItem>
              <SelectItem value="not_requested">درخواست نشده</SelectItem>
              <SelectItem value="requested">درخواست شده</SelectItem>
              <SelectItem value="rejected">رد شده</SelectItem>
              <SelectItem value="actived">فعال شده</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table dir="rtl">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center font-bold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  هیچ نتیجه‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isHistoryDialogOpen && <UserChangeHistoryTable userChangeHistory={userChangeHistory} setIsHistoryDialogOpen={setIsHistoryDialogOpen} />}
    </div>
  )
}
