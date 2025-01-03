import React from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SingleProductStatistics } from "./types"
import StatCard from "./StatCard"
import numeral from 'numeral'

interface ProductStatsModalProps {
  product: SingleProductStatistics
  onClose: () => void
}

const formatNumber = (value: number) => numeral(value).format('0,0')
const formatCurrency = (value: number) => numeral(value).format('0,0') + ' تومان'

const ProductStatsModal: React.FC<ProductStatsModalProps> = ({ product, onClose }) => (
  <Dialog open={true} onOpenChange={onClose}>
    <DialogContent className="max-w-3xl *:!text-right">
      <DialogHeader>
        <DialogTitle>آمار خدمت: {product.title}</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[60vh] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard title="شناسه" value={formatNumber(product.id)} />
          <StatCard title="عنوان" value={product.title} />
          <StatCard title="قیمت" value={formatCurrency(product.price)} />
          <StatCard title="موجودی" value={formatNumber(product.balance)} />
          <StatCard title="دسته‌بندی" value={product.category} />
          <StatCard title="تعداد جمع‌آوری سرمایه" value={formatNumber(product.total_fundraises)} />
          <StatCard title="تعداد نیکوکاری ها" value={formatNumber(product.total_invests)} />
          <StatCard title="مجموع مبلغ نیکوکاری " value={formatCurrency(product.total_invest_amount)} />
          <StatCard title="تعداد خریدها" value={formatNumber(product.total_purchases)} />
          <StatCard title="مجموع مبلغ خرید" value={formatCurrency(product.total_purchase_amount)} />
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>جمع‌آوری‌های سرمایه</CardTitle>
          </CardHeader>
          <CardContent>
            {product.fundraises.length > 0 ? (
              product.fundraises.map((fundraise, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{fundraise.title}</p>
                  <p>هدف: {formatCurrency(fundraise.price_total)}</p>
                  <p>جمع‌آوری شده: {formatCurrency(fundraise.price_collected)}</p>
                  <Progress value={fundraise.completion_percentage} className="mt-2" />
                  <p className="text-right text-xs text-gray-500 mt-1">
                    {numeral(fundraise.completion_percentage).format('0.0')}% تکمیل شده
                  </p>
                </div>
              ))
            ) : (
              <p>هیچ جمع‌آوری سرمایه‌ای برای این خدمت وجود ندارد.</p>
            )}
          </CardContent>
        </Card>
      </ScrollArea>
      <DialogFooter>
        <Button onClick={onClose}>بستن</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default ProductStatsModal