import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchProduct } from "@/features/product/services/productService"
import { Product } from "@/types/product"
import Footer from "@/components/layout/Footer"
import { handleError } from "@/utils/errorHandler"
import ProductDetails from "@/components/product/ProductDetails"
import PurchaseSection from "@/components/product/PurchaseSection"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import { getImageUrl } from "@/utils/env"
import { FileWarning } from "lucide-react"

const ProductShow = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const data = await fetchProduct(Number(id))
        setProduct(data)
      } catch (error) {
        handleError(error, "Failed to load product details")
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) return <LoadingSpinner />

  if (!product) {
    return (
      <div className="alert alert-info">
        <FileWarning />
        <span>خدمت یافت نشد.</span>
      </div>
    )
  }

  return (
    <div className="grid max-w-5xl mx-auto">
      <header>
        <ProductDetails product={product} />
      </header>
      <div>
        <section className="[@media(max-width:400px)]:px-2">
          <div className="grid grid-cols-2 [@media(max-width:400px)]:grid-cols-1 [@media(max-width:400px)]:mt-4 [@media(max-width:400px)]:gap-4 gap-20 justify-between items-end mt-10">
            <div>
              <img src={getImageUrl(product.picture)} className="rounded-xl mx-auto aspect-square w-full" alt={product.title} />
            </div>
            <div className="grid gap-8">
              <section>
                <div className="grid">
                  <div className="flex items-center mb-4 gap-[16px]">
                    <div className="h-[32px] w-[16px] rounded bg-[#d6bbf7]"></div>
                    <div className="text-lg font-semibold">اطلاعات</div>
                  </div>
                </div>
                <div>{product.describe}</div>
              </section>
              <PurchaseSection product={product} />
            </div>
          </div>
        </section>
      </div>
      <Footer className="mt-20" />
    </div>
  )
}

export default ProductShow
