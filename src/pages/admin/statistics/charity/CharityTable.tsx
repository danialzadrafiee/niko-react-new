import React from "react"
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, ColumnDef, flexRender, SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CharityStatistics } from "./types"
import numeral from "numeral"

interface CharityTableProps {
  statistics: CharityStatistics[]
  onViewDetails: (charity: CharityStatistics) => void
}

const CharityTable: React.FC<CharityTableProps> = ({ statistics, onViewDetails }) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  
  const columns = React.useMemo<ColumnDef<CharityStatistics>[]>(
    () => [
      {
        accessorKey: "charity_name",
        header: "نام خیریه",
        cell: (info) => info.getValue() || `خیریه ${info.row.original.charity_id}`,
      },
      {
        accessorKey: "total_fundraises",
        header: "کل صندوق‌ها",
        sortingFn: "basic",
      },
      {
        accessorKey: "live_fundraises",
        header: "صندوق‌های فعال",
        sortingFn: "basic",
      },
      {
        accessorKey: "completed_fundraises",
        header: "صندوق‌های تکمیل شده",
        sortingFn: "basic",
      },
      {
        accessorKey: "total_amount_raised",
        header: "کل مبلغ جمع‌آوری شده",
        cell: (info) => formatCurrency(info.getValue<number>()),
        sortingFn: "basic",
      },
      {
        accessorKey: "average_completion_percentage",
        header: "میانگین تکمیل",
        cell: (info) => formatPercentage(info.getValue<number>()),
        sortingFn: "basic",
      },
      {
        accessorKey: "total_investors",
        header: "تعداد سرمایه‌گذاران",
        sortingFn: "basic",
      },
      {
        id: "actions",
        header: "عملیات",
        cell: (info) => (
          <Button onClick={() => onViewDetails(info.row.original)}>
            مشاهده جزئیات
          </Button>
        ),
      },
    ],
    [onViewDetails]
  )
  const formatCurrency = (value: number) => numeral(value).format('0,0') + ' تومان'
  const formatPercentage = (value: number) => numeral(value).format('0.00') + '%'
  
  const table = useReactTable({
    data: statistics,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="*:text-center">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="جستجو بر اساس نام خیریه"
          value={(table.getColumn("charity_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("charity_name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="تعداد نمایش" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                نمایش {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="*:text-center" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="*:text-center">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow  key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell  key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          قبلی
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          بعدی
        </Button>
      </div>
    </div>
  )
}

export default CharityTable