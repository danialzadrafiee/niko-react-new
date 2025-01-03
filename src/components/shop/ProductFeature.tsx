import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@/components/shop/ShopCard'
import ShopFeaturedBreak from './ShopFeaturedBreak'
import { fetchProducts } from '@/features/product/services/productService'
import { Product } from '@/types/product'

interface ProductFeatureProps {
  title: string
  supTitle?: string
  sortBy: 'created_at' | 'price'
  sortOrder?: 'asc' | 'desc'
}

const ProductFeature: React.FC<ProductFeatureProps> = ({
  title,
  supTitle,
  sortBy,
  sortOrder = 'desc'
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = {
          page: 1,
          per_page: 4,
          sort_by: sortBy,
          sort_order: sortOrder
        }
        const response = await fetchProducts(params)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sortBy, sortOrder])

  return (
    <div className="relative w-full">
      <div className="px-0 sm:px-[88px] pt-[24px] sm:pt-12">
        <div className="pr-[16px] sm:pr-0">
          <ShopFeaturedBreak title={title} supTitle={supTitle} />
        </div>
        <section className="overflow-x-scroll sm:overflow-x-visible w-[calc(100dvw-10px)] sm:w-auto">
          <div className="grid w-max lg:w-full grid-cols-4 pt-[24px] sm:pt-10 pb-4 sm:pb-0 pr-[16px] sm:pr-0 gap-[12px] sm:gap-[24px]">
            {loading ? (
              <div>در حال بارگذاری...</div>
            ) : (
              products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`} className="cursor-pointer">
                  <Card variant="product" data={product} />
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default React.memo(ProductFeature)