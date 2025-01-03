// src/pages/admin/Product/Create/CategorySelect.tsx

import React from "react"
import { UseFormReturn } from "react-hook-form"
import useCategoryStore from "@/features/category/store/categoryStore"
import { Category } from "@/types/category"
import { ProductFormValues } from "@/features/product/schemas/ProductSchema"

const renderCategoryOptions = (categories: Category[], parentPath = ""): JSX.Element[] => {
  return categories.flatMap((category) => {
    const currentPath = parentPath ? `${parentPath} > ${category.name}` : category.name
    const result = [
      <option key={category.id} value={category.id}>
        {currentPath}
      </option>,
    ]

    if ((category.children?.length as number) > 0) {
      result.push(...renderCategoryOptions(category.children as Category[], currentPath))
    }

    return result
  })
}

interface CategorySelectProps {
  name: keyof ProductFormValues
  required?: boolean
  form: UseFormReturn<ProductFormValues>
}

const CategorySelect: React.FC<CategorySelectProps> = ({ name, required = false, form }) => {
  const { categories } = useCategoryStore()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div>
      <label htmlFor={name} className="label">
        <span className="label-text">
          دسته بندی
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      <select id={name} {...register(name, { required: required ? " دسته بندی الزامی است" : false })} className="w-full select select-bordered">
        <option value=""> انتخاب دسته بندی</option>
        {renderCategoryOptions(categories)}
      </select>
      {errors[name] && <div className="mt-1 text-sm text-error">{errors[name]?.message}</div>}
    </div>
  )
}

export default CategorySelect
