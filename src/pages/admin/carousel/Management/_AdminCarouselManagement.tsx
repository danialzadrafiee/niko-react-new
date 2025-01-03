import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ImageUpload from "@/components/common/ImageUpload"
import { Edit, Trash2 } from "lucide-react"
import useCarouselStore from "@/features/carousel/store/carouselStore"
import { CarouselItem } from "@/types/home"
import { getImageUrl } from "@/utils/env"

const carouselSchema = z.object({
  image: z.instanceof(File).nullable(),
  route_link: z.string().min(1, "لینک الزامی است"),
  order: z.number().min(0, "ترتیب الزامی است"),
})

type CarouselFormData = z.infer<typeof carouselSchema>

const AdminCarouselManagement: React.FC = () => {
  const { carouselItems, fetchCarouselItems, createCarouselItem, updateCarouselItem, deleteCarouselItem } = useCarouselStore()
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null)

  const form = useForm<CarouselFormData>({
    resolver: zodResolver(carouselSchema),
    defaultValues: { image: null, route_link: "", order: 0 },
  })

  useEffect(() => {
    fetchCarouselItems()
  }, [fetchCarouselItems])

  const handleSubmit = async (data: CarouselFormData) => {
    if (editingItem) {
      await updateCarouselItem(editingItem.id, data as any )
    } else {
      await createCarouselItem(data as any)
    }
    setEditingItem(null)
    form.reset()
  }

  const handleEdit = (item: CarouselItem) => {
    setEditingItem(item)
    form.reset({
      route_link: item.route_link,
      order: item.order,
      image: null, // Reset image to null when editing
    })
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{editingItem ? "ویرایش اسلایدر" : "افزودن عکس به اسلایدر"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Controller
            name="image"
            control={form.control}
            render={({ field }) => (
              <ImageUpload
                name="image"
                form={form}
                onChange={(file) => field.onChange(file)}
              />
            )}
          />

          <Input
            {...form.register("route_link")}
            placeholder="لینک"
          />
          {form.formState.errors.route_link && (
            <div className="text-sm text-red-500">{form.formState.errors.route_link.message}</div>
          )}

          <Input
            {...form.register("order", { valueAsNumber: true })}
            type="number"
            placeholder="Order"
          />
          {form.formState.errors.order && (
            <div className="text-sm text-red-500">{form.formState.errors.order.message}</div>
          )}

          <Button type="submit">
            {editingItem ? "آدیت" : "افزودن"} ایتم اسلایدر
          </Button>

          {editingItem && (
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              لغو ویرایش
            </Button>
          )}
        </form>

        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead>تصویر</TableHead>
              <TableHead>لینک</TableHead>
              <TableHead>ترتیب</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carouselItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.image && (
                    <img src={getImageUrl(item.image)} alt="Carousel item" className="w-20 h-20 object-cover" />
                  )}
                </TableCell>
                <TableCell>{item.route_link}</TableCell>
                <TableCell>{item.order}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item as any)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteCarouselItem(item.id)}>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminCarouselManagement