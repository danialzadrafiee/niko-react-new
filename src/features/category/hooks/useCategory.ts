// src/hooks/useCategory.ts

import { useState } from "react"
import * as Yup from "yup"
import useCategoryStore from "../store/categoryStore"
import { Category } from "@/types/category"

export const useCategoryForm = (initialCategory?: Partial<Category>) => {
  const { createCategory, updateCategory } = useCategoryStore()
  const [initialValues] = useState({
    name: initialCategory?.name || "",
    parent_id: initialCategory?.parent_id || null,
    image: initialCategory?.image || null,
    is_selected: initialCategory?.is_selected || false,
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
    parent_id: Yup.number().nullable(),
  })

  const handleSubmit = async (values: Partial<Category>, { resetForm }: { resetForm: () => void }) => {
    try {
      if (initialCategory?.id) {
        await updateCategory(initialCategory.id, values)
      } else {
        await createCategory(values)
      }
      resetForm()
    } catch (error) {
      console.error("Error submitting category form:", error)
    }
  }

  return { initialValues, validationSchema, handleSubmit }
}
