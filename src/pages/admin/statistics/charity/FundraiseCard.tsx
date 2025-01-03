import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Fundraise } from "./types"
import { Eye, CircleDot, CheckCircle2, XCircle, Archive, RefreshCcw, ArrowUpCircle } from "lucide-react"
import numeral from "numeral"

interface FundraiseCardProps {
  fundraise: Fundraise | null | undefined
  title: string
  onViewDetails: (fundraise: Fundraise) => void
}

const statusConfig = {
  empty: { icon: CircleDot, color: "text-gray-500", text: "خالی" },
  live: { icon: CheckCircle2, color: "text-green-500", text: "فعال" },
  dead: { icon: XCircle, color: "text-red-500", text: "ناموفق" },
  rejected: { icon: XCircle, color: "text-red-500", text: "رد شده" },
  filled: { icon: Archive, color: "text-blue-500", text: "تکمیل شده" },
  withdraw_requested: { icon: RefreshCcw, color: "text-yellow-500", text: "درخواست برداشت" },
  withdraw_done: { icon: ArrowUpCircle, color: "text-purple-500", text: "برداشت انجام شده" },
}
const formatCurrency = (value: number) => numeral(value).format("0,0") + " تومان"
const formatPercentage = (value: number) => numeral(value).format("0.00") + "%"

const FundraiseCard: React.FC<FundraiseCardProps> = ({ fundraise, title, onViewDetails }) => {
  if (!fundraise) {
    return null
  }

  const StatusIcon = statusConfig[fundraise.status]?.icon || CircleDot
  const statusColor = statusConfig[fundraise.status]?.color || "text-gray-500"
  const statusText = statusConfig[fundraise.status]?.text || fundraise.status

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm">{fundraise.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${statusColor} bg-opacity-10`}>
            <StatusIcon className="h-3 w-3" />
            {statusText}
          </span>
        </div>
        <Progress value={fundraise.completion_percentage} className="h-2 mb-2" />
        <div className="flex justify-between text-xs mb-2">
          <span>{formatCurrency(fundraise.price_collected)}</span>
          <span>{formatPercentage(fundraise.completion_percentage)}</span>
          <span>{formatCurrency(fundraise.price_total)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{title}</span>
          <Button size="sm" variant="ghost" onClick={() => onViewDetails(fundraise)} className="p-1 h-auto">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FundraiseCard
