import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import useFundraiseStore from "@/features/fundraise/store/fundraiseStore"
import useAuthStore from "@/features/auth/store/authStore"
import { Fundraise } from "@/types/fundraise"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, ChevronDown, Eye, Trash2, CreditCard, BarChart, MoreHorizontal, Calendar, DollarSign, Users, Target, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@radix-ui/react-progress"
import useFundraiseUpdateForm from "@/features/fundraise/hooks/useFundraiseUpdateForm"

const FundraiseOwnedWrapper: React.FC<{ id: number; children: (props: { handleUpdateSubmit: (values: any) => Promise<void>; loading: boolean }) => React.ReactNode }> = ({ id, children }) => {
  const { handleUpdateSubmit, loading } = useFundraiseUpdateForm(id)
  return <>{children({ handleUpdateSubmit, loading })}</>
}

const FundraiseOwned: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { fundraises, loading, fetchFundraises, deleteFundraise } = useFundraiseStore()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const RenderStatus = (status: string) => {
    switch (status) {
      case "empty":
        return <Badge className="bg-gray-500 text-white">بدون واریز</Badge>
      case "live":
        return <Badge className="bg-green-500 text-white">فعال</Badge>
      case "dead":
        return <Badge className="bg-red-500 text-white">منقضی شده</Badge>
      case "rejected":
        return <Badge className="bg-red-500 text-white">لغو شده</Badge>
      case "filled":
        return <Badge className="bg-yellow-500 text-white">تکمیل شده</Badge>
      case "withdraw_requested":
        return <Badge className="bg-blue-500 text-white">درخواست برداشت</Badge>
      case "withdraw_done":
        return <Badge className="bg-green-500 text-white">برداشت شده</Badge>
      default:
        return <Badge className="bg-gray-500 text-white">نامشخص</Badge>
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این صندوق را حذف کنید؟")) {
      await deleteFundraise(id)
    }
  }

  const handleWithdrawRequest = async (_: number, handleUpdateSubmit: (values: any) => Promise<void>) => {
    await handleUpdateSubmit({ status: "withdraw_requested" })
    await fetchFundraises({ owner_id: user?.id })
  }

  useEffect(() => {
    if (user) {
      fetchFundraises({ owner_id: user.id })
    }
  }, [user, fetchFundraises])

  const renderStatistics = (fundraise: Fundraise) => {
    const totalInvested = fundraise.price_collected
    const remainingAmount = fundraise.remaining_amount
    const daysLeft = Math.ceil((new Date(fundraise.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))

    return (
      <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
        <CardHeader className="border-b border-blue-200">
          <CardTitle className="text-2xl font-bold text-blue-800">آمار صندوق</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <Progress value={fundraise.completion_percentage} className="h-3 w-full" />
              <p className="text-center text-sm text-blue-600 mt-2 font-medium">{fundraise.completion_percentage}% تکمیل شده</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <StatItem icon={<Calendar className="h-5 w-5 text-blue-500" />} label="تاریخ ایجاد" value={new Date(fundraise.created_at).toLocaleDateString("fa-IR")} />
              <StatItem icon={<Calendar className="h-5 w-5 text-green-500" />} label="مهلت" value={new Date(fundraise.deadline).toLocaleDateString("fa-IR")} />
              <StatItem icon={<Target className="h-5 w-5 text-yellow-500" />} label="تعداد محصول" value={fundraise.amount.toLocaleString()} />
              <StatItem icon={<Users className="h-5 w-5 text-purple-500" />} label="تعداد کل نیکوکاری ها" value={fundraise.invests.length.toLocaleString()} />
              <StatItem icon={<DollarSign className="h-5 w-5 text-green-500" />} label="مبلغ جمع آوری شده" value={`${totalInvested.toLocaleString()} تومان`} />
              <StatItem icon={<DollarSign className="h-5 w-5 text-red-500" />} label="مبلغ باقی مانده" value={`${remainingAmount.toLocaleString()} تومان`} />
              <StatItem icon={<Clock className="h-5 w-5 text-orange-500" />} label="روزهای باقی مانده" value={daysLeft > 0 ? String(daysLeft) : "پایان یافته"}  />
              <StatItem icon={<DollarSign className="h-5 w-5 text-blue-500" />} label="قیمت هر واحد" value={`${fundraise.price_per_single_product.toLocaleString()} تومان`} />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const StatItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white p-4 rounded-lg shadow-md border border-gray-100">
      <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )

  const columns: ColumnDef<Fundraise>[] = [
    {
      accessorKey: "title",
      header: "عنوان",
      cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            تعداد خدمت
            <ArrowUpDown className="mr-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => RenderStatus(row.getValue("status")),
    },
    {
      accessorKey: "deadline",
      header: "مهلت",
      cell: ({ row }) => <div>{new Date(row.getValue("deadline")).toLocaleDateString("fa-IR")}</div>,
    },
    {
      accessorKey: "completion_percentage",
      header: "پیشرفت",
      cell: ({ row }) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${row.getValue("completion_percentage")}%` }}></div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => {
        const fundraise = row.original

        return (
          <FundraiseOwnedWrapper id={fundraise.id}>
            {({ handleUpdateSubmit, loading: updateLoading }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">باز کردن منو</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="grid gap-4">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/fundraises/${fundraise.id}`)}>
                      <Eye className="mr-2 h-4 w-4" /> مشاهده جزئیات
                    </Button>
                    {fundraise.status === "empty" && (
                      <Button variant="outline" size="sm" onClick={() => handleDelete(fundraise.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> حذف صندوق
                      </Button>
                    )}
                    {fundraise.status === "filled" && (
                      <Button variant="outline" size="sm" onClick={() => handleWithdrawRequest(fundraise.id, handleUpdateSubmit)} disabled={updateLoading}>
                        <CreditCard className="mr-2 h-4 w-4" /> درخواست برداشت
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <BarChart className="mr-2 h-4 w-4" /> نمایش آمار
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>آمار صندوق</DialogTitle>
                        </DialogHeader>
                        {renderStatistics(fundraise)}
                      </DialogContent>
                    </Dialog>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </FundraiseOwnedWrapper>
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (loading) return <div>در حال بارگذاری...</div>

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className="flex items-center py-4">
        <Input placeholder="فیلتر عنوان..." value={(table.getColumn("title")?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)} className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mr-auto">
              ستون‌ها <ChevronDown className="mr-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id === "title"
                      ? "عنوان"
                      : column.id === "amount"
                      ? "تعداد خدمت"
                      : column.id === "status"
                      ? "وضعیت"
                      : column.id === "deadline"
                      ? "مهلت"
                      : column.id === "completion_percentage"
                      ? "پیشرفت"
                      : column.id === "actions"
                      ? "عملیات"
                      : column.id}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} از {table.getFilteredRowModel().rows.length} سطر انتخاب شده.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            قبلی
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            بعدی
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FundraiseOwned
