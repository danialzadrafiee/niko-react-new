// src/features/product/hooks/useProductForm.ts

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useProductStore from "../store/productStore"
import useCategoryStore from "@/features/category/store/categoryStore"
import { handleError } from "@/utils/errorHandler"
import { productValidationSchema, ProductFormValues, productInitialValues } from "@/features/product/schemas/ProductSchema"

const useProductForm = (productId?: number) => {
  const { createProduct, updateProduct, fetchProduct } = useProductStore()
  const { categories, fetchCategories, loading } = useCategoryStore()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: productInitialValues,
  })

  useEffect(() => {
    fetchCategories().catch((error) => {
      handleError(error, "Failed to fetch categories")
    })
  }, [fetchCategories])

  useEffect(() => {
    if (productId) {
      fetchProduct(productId)
        .then((product) => {
          form.reset(product)
        })
        .catch((error) => {
          handleError(error, "Failed to fetch product")
        })
    }
  }, [productId, fetchProduct, form])

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === "picture" && value instanceof File) {
          formData.append(key, value)
        } else if (value != null) {
          formData.append(key, value.toString())
        }
      })

      if (productId) {
        await updateProduct(productId, formData as any)
      } else {
        await createProduct(formData)
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      handleError(error, productId ? "Failed to update product" : "Failed to create product")
    }
  }

  return { form, handleSubmit, categories, loading }
}

export default useProductForm
