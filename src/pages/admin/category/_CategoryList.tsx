import React, { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, ChevronRight, ChevronLeft, Folder, File, Search, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import useCategoryStore from "@/features/category/store/categoryStore"
import { Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import ImageUpload from "@/components/common/ImageUpload"
import { getImageUrl } from "@/utils/env"

const categorySchema = z.object({
  name: z.string().min(1, "نام دسته‌بندی الزامی است"),
  parent_id: z.string().nullable(),
  image: z.any().nullable(),
  is_selected: z.boolean(),
  order: z.number().int().min(0, "ترتیب باید عدد صحیح مثبت باشد"),
})

type CategoryFormValues = z.infer<typeof categorySchema>

const CategoryList: React.FC = () => {
  const { categories, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategoryStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const toggleExpand = (categoryId: number) => {
    setExpandedCategories((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]))
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("آیا از حذف این دسته‌بندی اطمینان دارید؟")) {
      await deleteCategory(id)
    }
  }

  const openAddCategoryModal = () => setIsAddModalOpen(true)
  const closeAddCategoryModal = () => setIsAddModalOpen(false)

  const openEditCategoryModal = (category: Category) => setEditingCategory(category)
  const closeEditCategoryModal = () => setEditingCategory(null)

  const reloadPage = () => {
    window.location.reload()
  }

  const CategoryForm: React.FC<{ category?: Category; onClose: () => void; onSuccess: () => void }> = ({ category, onClose, onSuccess }) => {
    const form = useForm<CategoryFormValues>({
      resolver: zodResolver(categorySchema),
      defaultValues: {
        name: category?.name || "",
        parent_id: category?.parent_id ? category.parent_id.toString() : null,
        image: null,
        is_selected: category?.is_selected || false,
        order: category?.order || 0,
      },
    })

    const onSubmit = async (data: CategoryFormValues) => {
      const formData = new FormData()
      formData.append("name", data.name)
      if (data.parent_id) {
        formData.append("parent_id", data.parent_id)
      }
      if (data.image) {
        formData.append("image", data.image)
      }
      formData.append("is_selected", data.is_selected ? "1" : "0")
      formData.append("order", data.order.toString())
  
      if (category) {
        await updateCategory(category.id, formData)
      } else {
        await createCategory(formData)
      }
      onSuccess() 
      form.reset()
      onClose()
    }

    const flattenCategories = (cats: Category[], depth = 0): { id: number; name: string; depth: number }[] => {
      return cats.reduce((acc, cat) => {
        acc.push({ id: cat.id, name: cat.name, depth })
        if (cat.children && cat.children.length > 0) {
          acc.push(...flattenCategories(cat.children, depth + 1))
        }
        return acc
      }, [] as { id: number; name: string; depth: number }[])
    }

    const flatCategories = flattenCategories(categories)

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام دسته‌بندی</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته‌بندی والد</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته‌بندی والد" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="null">هیچکدام</SelectItem>
                    {flatCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {"  ".repeat(cat.depth)}
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>تصویر دسته‌بندی</FormLabel>
                <FormControl>
                  <ImageUpload existingImageUrl={getImageUrl(category?.image)} name="image" form={form} onChange={(file) => field.onChange(file)} label="تصویر دسته‌بندی" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_selected"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>نمایش در هیروی سایت</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ترتیب</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">ذخیره</Button>
        </form>
      </Form>
    )
  }

  const renderCategoryTree = (categories: Category[], depth = 0) => {
    return categories.map((category) => {
      const isExpanded = expandedCategories.includes(category.id)
      const hasChildren = category.children && category.children.length > 0
  
      return (
        <div key={category.id} className={`rtl ${depth > 0 ? "mr-6 border-r pr-4" : ""}`}>
          <div className="flex items-center py-2">
            {hasChildren && (
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(category.id)} className="ml-2">
                {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
            {hasChildren ? <Folder className="h-5 w-5 ml-2 text-yellow-500" /> : <File className="h-5 w-5 ml-2 text-gray-400" />}
            {category.image && <img src={getImageUrl(category.image)} alt={category.name} className="w-6 h-6 object-cover rounded-full ml-2" />}
            <span className="flex-grow">{category.name}</span>
            {category.is_selected == true && (
              <>
                <span className="mr-2 text-green-500">نمایش در هیروی سایت | </span>
                <span className="mr-2">اولویت: {category.order}</span>
              </>
            )}
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => openEditCategoryModal(category)} className="mr-2">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {isExpanded && hasChildren && renderCategoryTree(category.children as Category[], depth + 1)}
        </div>
      )
    })
  }

  const filteredCategories = categories.filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container bg-white  rounded-lg mx-auto p-4 rtl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">دسته‌بندی‌ها</h1>
        <Button onClick={openAddCategoryModal}>
          <Plus className="ml-2 h-4 w-4" /> دسته جدید
        </Button>
      </div>

      <div className="relative mb-4">
        <Input type="text" placeholder="جستجوی دسته‌بندی" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-10" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchTerm && (
          <Button variant="ghost" size="sm" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setSearchTerm("")}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-1 border rounded-md p-4">{renderCategoryTree(filteredCategories)}</div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ایجاد دسته‌بندی جدید</DialogTitle>
          </DialogHeader>
          <CategoryForm onClose={closeAddCategoryModal} onSuccess={reloadPage} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && closeEditCategoryModal()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ویرایش دسته‌بندی</DialogTitle>
          </DialogHeader>
          {editingCategory && <CategoryForm category={editingCategory} onClose={closeEditCategoryModal} onSuccess={reloadPage} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CategoryList