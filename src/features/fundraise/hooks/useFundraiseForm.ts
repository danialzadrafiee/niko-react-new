import { useEffect, useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import useFundraiseStore from "../store/fundraiseStore"
import useProductStore from "@/features/product/store/productStore"
import useCategoryStore from "@/features/category/store/categoryStore"
import { handleError } from "@/utils/errorHandler"
import { fundraiseValidationSchema, FundraiseFormValues, fundraiseInitialValues } from "@/features/fundraise/schemas/fundraiseSchema"
import { Product } from "@/types/product"
import { Category } from "@/types/category"

const flattenCategories = (categories: Category[]): Category[] => {
  return categories.reduce((acc: Category[], category: Category) => {
    acc.push(category);
    if (category.children && category.children.length > 0) {
      acc.push(...flattenCategories(category.children));
    }
    return acc;
  }, []);
};

const useFundraiseForm = () => {
  const { createFundraise } = useFundraiseStore()
  const { products, fetchProducts } = useProductStore()
  const { categories, fetchCategories } = useCategoryStore()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [flattenedCategories, setFlattenedCategories] = useState<Category[]>([])

  const form = useForm<FundraiseFormValues>({
    resolver: zodResolver(fundraiseValidationSchema),
    defaultValues: fundraiseInitialValues,
  })

  const initializeFetchData = useCallback(async () => {
    try {
      setLoading(true)
      await Promise.all([fetchCategories(), fetchProducts({})])
    } catch (error) {
      handleError(error, "Failed to fetch initial data")
    } finally {
      setLoading(false)
    }
  }, [fetchCategories, fetchProducts])

  useEffect(() => {
    initializeFetchData()
  }, [initializeFetchData])

  useEffect(() => {
    setFlattenedCategories(flattenCategories(categories))
  }, [categories])

  const handleSubmit = async (values: FundraiseFormValues) => {
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === "picture" && value instanceof File) {
          formData.append(key, value)
        } else if (value != null) {
          formData.append(key, value.toString())
        }
      })

      await createFundraise(formData)
      form.reset()
    } catch (error) {
      handleError(error, "Failed to create fundraise")
    }
  }

  const handleCategoryChange = async (categoryId: string) => {
    const category = flattenedCategories.find((c) => c.id === Number(categoryId))
    setSelectedCategory(category || null)
    setSelectedProduct(null)
    form.setValue("product_id", "")

    if (category) {
      try {
        await fetchProducts({ category_id: category.id })
      } catch (error) {
        handleError(error, "Failed to fetch products for the selected category")
      }
    }
  }

  const handleProductChange = (productId: string) => {
    const product = products.data.find((p: Product) => p.id === Number(productId))
    setSelectedProduct(product || null)
    if (product) {
      form.setValue("price_per_single_product", product.price)
    }
  }

  return {
    form,
    handleSubmit,
    handleCategoryChange,
    handleProductChange,
    flattenedCategories,
    products,
    selectedCategory,
    selectedProduct,
    loading,
  }
}

export default useFundraiseForm