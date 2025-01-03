import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import numeral from "numeral"

interface ProductListTableProps {
  products: any[]
  onViewStats: (id: number) => void
}

const ProductListTable: React.FC<ProductListTableProps> = ({ products, onViewStats }) => (
  <Card>
    <CardHeader>
      <CardTitle>لیست خدمات</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead>موجودی</TableHead>
            <TableHead>دسته‌بندی</TableHead>
            <TableHead>عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{numeral(product.price).format("0,0")}</TableCell>
              <TableCell>{product.balance}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>
                <Button onClick={() => onViewStats(product.id)}>مشاهده آمار</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

export default ProductListTable
