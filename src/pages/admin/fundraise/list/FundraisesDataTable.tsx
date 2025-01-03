import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fundraise } from "@/types/fundraise"
import useFundraiseStore from "@/features/fundraise/store/fundraiseStore"
import { ArrowUpDown, Edit, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const FundraisesDataTable: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const navigate = useNavigate()
  const { fundraises, fetchFundraises } = useFundraiseStore()

  useEffect(() => {
    fetchFundraises({
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      status: statusFilter === "all" ? "" : statusFilter,
    })
  }, [fetchFundraises, pagination.pageIndex, pagination.pageSize, statusFilter])

  const columns: ColumnDef<Fundraise>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="w-[80px] font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          عنوان
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "price_collected",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          مبلغ جمع‌آوری شده
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right font-medium">{new Intl.NumberFormat("fa-IR").format(row.getValue("price_collected"))} تومان</div>,
    },
    {
      accessorKey: "price_total",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          مبلغ کل
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-right font-medium">{new Intl.NumberFormat("fa-IR").format(row.getValue("price_total"))} تومان</div>,
    },
    {
      accessorKey: "completion_percentage",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          درصد تکمیل
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="w-full">
          <Progress value={row.getValue("completion_percentage")} className="w-full" />
          <span className="text-xs text-muted-foreground">{Math.floor(row.getValue("completion_percentage"))}%</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          وضعیت
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status: string = row.getValue("status")
        const getStatusInfo = (status: string) => {
          switch (status) {
            case "empty":
              return { label: "خالی", variant: "secondary" }
            case "live":
              return { label: "فعال", variant: "success" }
            case "dead":
              return { label: "پایان یافته", variant: "destructive" }
            case "rejected":
              return { label: "رد شده", variant: "destructive" }
            case "filled":
              return { label: "تکمیل شده", variant: "success" }
            case "withdraw_requested":
              return { label: "درخواست برداشت", variant: "warning" }
            case "withdraw_done":
              return { label: "برداشت انجام شده", variant: "primary" }
            default:
              return { label: "نامشخص", variant: "secondary" }
          }
        }
        const statusInfo = getStatusInfo(status)
        return <Badge variant={statusInfo.variant as any}>{statusInfo.label}</Badge>
      },
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          تاریخ پایان
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{new Date(row.getValue("deadline")).toLocaleDateString("fa-IR")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const fundraise = row.original
        return (
          <Button variant="outline" size="sm" onClick={() => handleEdit(fundraise.id)}>
            <Edit className="h-4 w-4 mr-2" />
            ویرایش
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data: fundraises.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: Math.ceil(fundraises.total / pagination.pageSize),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  const handleEdit = (id: number) => {
    navigate(`/admin/fundraises/edit/${id}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>مدیریت صندوق‌های مشارکتی</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="جستجوی صندوق مشارکتی..." value={(table.getColumn("title")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)} className="max-w-sm" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="فیلتر وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                <SelectItem value="empty">خالی</SelectItem>
                <SelectItem value="live">فعال</SelectItem>
                <SelectItem value="dead">پایان یافته</SelectItem>
                <SelectItem value="rejected">رد شده</SelectItem>
                <SelectItem value="filled">تکمیل شده</SelectItem>
                <SelectItem value="withdraw_requested">درخواست برداشت</SelectItem>
                <SelectItem value="withdraw_done">برداشت انجام شده</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                ستون‌ها
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    نتیجه‌ای یافت نشد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">{`${fundraises.from}-${fundraises.to} از ${fundraises.total} سطر`}</div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              قبلی
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              بعدی
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
