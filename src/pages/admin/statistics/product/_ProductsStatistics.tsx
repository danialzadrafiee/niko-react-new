import React, { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import axiosInstance from "@/utils/axiosInstance"
import { handleError } from "@/utils/errorHandler"
import { ProductStatistics, SingleProductStatistics } from "./types"
import StatCard from "./StatCard"
import ProductCard from "./ProductCard"
import TopCategoriesCard from "./TopCategoriesCard"
import ProductListTable from "./ProductListTable"
import ProductStatsModal from "./ProductStatsModal"
import numeral from "numeral"

const ProductsStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<ProductStatistics | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<SingleProductStatistics | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchStatistics = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get("/admin/products/statistics")
      setStatistics(response.data.payload)
    } catch (error) {
      handleError(error, "بارگذاری آمار خدمات با شکست مواجه شد")
    } finally {
      setLoading(false)
    }
  }
  const formatNumber = (value: number) => numeral(value).format("0,0")
  const formatCurrency = (value: number) => numeral(value).format("0,0") + " تومان"

  const fetchSingleProductStatistics = async (productId: number) => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/admin/products/${productId}/statistics`)
      setSelectedProduct(response.data)
      setIsModalOpen(true)
    } catch (error) {
      handleError(error, "بارگذاری آمار خدمت با شکست مواجه شد")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatistics()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!statistics) {
    return <div>آماری در دسترس نیست.</div>
  }

  return (
    <div className="space-y-8 p-8 *:!text-right">
      <h1 className="text-3xl font-bold">آمار خدمات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="تعداد کل خدمات" value={formatNumber(statistics.total_products)} />
        <StatCard title="ارزش کل" value={formatCurrency(statistics.total_value)} />
        <StatCard title="میانگین قیمت" value={formatCurrency(statistics.average_price)} />
        <StatCard title="تعداد کل جمع‌آوری سرمایه" value={formatNumber(statistics.total_fundraises)} />
        <StatCard title="تعداد کل نیکوکاری ها" value={formatNumber(statistics.total_invests)} />
        <StatCard title="مجموع مبلغ نیکوکاری " value={formatCurrency(statistics.total_invest_amount)} />
        <StatCard title="تعداد کل خریدها" value={formatNumber(statistics.total_purchases)} />
        <StatCard title="مجموع مبلغ خرید" value={formatCurrency(statistics.total_purchase_amount)} />
      </div>

      <TopCategoriesCard categories={statistics.top_categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductCard title="خدمت با بالاترین قیمت" product={statistics.highest_priced_product} />
        <ProductCard title="خدمت با پایین‌ترین قیمت" product={statistics.lowest_priced_product} />
        <ProductCard title="خدمت با بیشترین موجودی" product={statistics.most_stocked_product} />
        <ProductCard title="خدمت با کمترین موجودی" product={statistics.least_stocked_product} />
        <ProductCard title="خدمت با بیشترین جمع‌آوری سرمایه" product={statistics.product_with_most_fundraises} />
        <ProductCard title="خدمت با بیشترین نیکوکاری " product={statistics.product_with_most_invests} />
        <ProductCard title="خدمت با بیشترین خرید" product={statistics.product_with_most_purchases} />
      </div>

      <ProductListTable products={statistics.recently_added_products} onViewStats={fetchSingleProductStatistics} />

      {isModalOpen && selectedProduct && <ProductStatsModal product={selectedProduct} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default ProductsStatistics
