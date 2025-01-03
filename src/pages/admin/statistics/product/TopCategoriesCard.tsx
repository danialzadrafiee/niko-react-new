import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TopCategoriesCardProps {
  categories: Array<{ id: number; name: string; count: number }>
}

const TopCategoriesCard: React.FC<TopCategoriesCardProps> = ({ categories }) => (
  <Card>
    <CardHeader>
      <CardTitle>دسته‌بندی‌های برتر</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>دسته‌بندی</TableHead>
            <TableHead>تعداد</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

export default TopCategoriesCard