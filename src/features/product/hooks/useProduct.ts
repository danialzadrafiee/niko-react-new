// src/hooks/useProduct.ts

import { useState } from "react"
import * as Yup from "yup"
import useProductStore from "../store/productStore"
import { Product } from "@/types/product"

export const useProductForm = (initialProduct?: Partial<Product>) => {
  const { createProduct, updateProduct } = useProductStore()
  const [initialValues] = useState({
    title: initialProduct?.title || "",
    balance: initialProduct?.balance || 0,
    price: initialProduct?.price || 0,
    describe: initialProduct?.describe || "",
    location: initialProduct?.location || "",
    picture: initialProduct?.picture || "",
    category_id: initialProduct?.category_id || null,
  })

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    balance: Yup.number().required("Balance is required"),
    price: Yup.number().required("Price is required"),
    describe: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    picture: Yup.string().required("Picture URL is required"),
    category_id: Yup.number().required("Category is required"),
  })

  const handleSubmit = async (values: Partial<Product>, { resetForm }: { resetForm: () => void }) => {
    try {
      if (initialProduct?.id) {
        await updateProduct(initialProduct.id, values)
      } else {
        await createProduct(values as any)
      }
      resetForm()
    } catch (error) {
      console.error("Error submitting product form:", error)
    }
  }

  return { initialValues, validationSchema, handleSubmit }
}
