import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getImageUrl } from "@/utils/env"
import numeral from 'numeral'

interface ProductCardProps {
  title: string
  product: any
}

const formatNumber = (value: number) => numeral(value).format('0,0')
const formatCurrency = (value: number) => numeral(value).format('0,0') + ' تومان'

const ProductCard: React.FC<ProductCardProps> = ({ title, product }) => (
  <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
    <CardHeader className="bg-gray-50 pb-2">
      <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <img
           src={getImageUrl(product.picture)}
           alt={product.title}
           className="w-full md:w-32 h-32 object-cover rounded-lg shadow-md mb-4 md:mb-0"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-gray-600">قیمت:</p>
            <p className="font-medium text-gray-800">{formatCurrency(product.price)}</p>
            <p className="text-gray-600">موجودی:</p>
            <p className="font-medium text-gray-800">{formatNumber(product.balance)}</p>
            <p className="text-gray-600">دسته‌بندی:</p>
            <p className="font-medium text-gray-800">{product.category.name}</p>
          </div>
        </div>
      </div>
      {product.fundraises && product.fundraises.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">آخرین جمع‌آوری سرمایه:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <p className="text-gray-600">عنوان:</p>
            <p className="font-medium text-gray-800">{product.fundraises[0].title}</p>
            <p className="text-gray-600">هدف:</p>
            <p className="font-medium text-gray-800">{formatCurrency(product.fundraises[0].price_total)}</p>
            <p className="text-gray-600">جمع‌آوری شده:</p>
            <p className="font-medium text-gray-800">{formatCurrency(product.fundraises[0].price_collected)}</p>
          </div>
          <Progress
             value={product.fundraises[0].completion_percentage}
             className="h-2 bg-gray-200"
          />
          <p className="text-right text-xs text-gray-500 mt-1">
            {numeral(product.fundraises[0].completion_percentage).format('0.0')}% تکمیل شده
          </p>
        </div>
      )}
    </CardContent>
  </Card>
)

export default ProductCard