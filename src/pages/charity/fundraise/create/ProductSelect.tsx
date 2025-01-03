import React from "react"
import { UseFormReturn } from "react-hook-form"
import { Product } from "@/types/product"
import { Category } from "@/types/category"
import { FundraiseFormValues } from "@/features/fundraise/schemas/fundraiseSchema"

interface ProductSelectProps {
  products: {
    data: Product[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  flattenedCategories: Category[]
  selectedCategory: Category | null
  onCategoryChange: (categoryId: string) => void
  onProductChange: (productId: string) => void
  form: UseFormReturn<FundraiseFormValues>
}

const ProductSelect: React.FC<ProductSelectProps> = ({ products, flattenedCategories, selectedCategory, onCategoryChange, onProductChange, form }) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="category" className="label">
          <span className="label-text">دسته بندی</span>
        </label>
        <select id="category" className="select select-bordered w-full" onChange={(e) => onCategoryChange(e.target.value)}>
          <option value=""> انتخاب دسته بندی</option>
          {flattenedCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {"-".repeat(category.depth)} {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="product_id" className="label">
          <span className="label-text"> خدمت</span>
        </label>
        <select id="product_id" {...register("product_id", { required: "Product is required" })} className="select select-bordered w-full" onChange={(e) => onProductChange(e.target.value)} disabled={!selectedCategory}>
          <option value=""> انتخاب خدمت</option>
          {products.data.map((product) => (
            <option key={product.id} value={product.id}>
              {product.title}
            </option>
          ))}
        </select>
        {errors.product_id && <div className="mt-1 text-sm text-error">{errors.product_id.message}</div>}
      </div>
    </div>
  )
}

export default ProductSelect
