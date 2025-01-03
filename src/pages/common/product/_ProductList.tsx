import React from "react"
import { useNavigate } from "react-router-dom"
import useProductStore from "@/features/product/store/productStore"
import useCategoryStore from "@/features/category/store/categoryStore"
import { Product } from "@/types/product"
import { FilterOption } from "@/components/shared/FilterOptions"
import GenericList from "@/components/shared/GenericList"

const ProductList: React.FC = () => {
  const navigate = useNavigate()
  const { products, fetchProducts, loading } = useProductStore()
  const { fetchCategories, categories } = useCategoryStore()

  const filterOptions: FilterOption[] = [
    { key: "search", type: "text", placeholder: "جستجوی خدمات" },
    { key: "min_price", type: "number", placeholder: "حداقل قیمت" },
    { key: "max_price", type: "number", placeholder: "حداکثر قیمت" },
  ] as const

  const handleViewDetails = (id: number) => {
    navigate(`/products/${id}`)
  }

  const getCardData = (product: Product) => ({
    id: product.id,
    title: product.title,
    picture: product.picture,
    describe: product.describe,
    price: product.price,
    balance: product.balance,
    location: product.location,
    category: product.category?.name,
  })

  return (
    <GenericList<Product>
      title="خیریه فردی"
      items={products}
      categories={categories}
      loading={loading}
      fetchItems={fetchProducts}
      fetchCategories={fetchCategories}
      handleViewDetails={handleViewDetails}
      getCardData={getCardData}
      filterOptions={filterOptions}
      baseUrl="/products/list"
    />
  )
}

export default ProductList
