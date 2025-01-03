import React, { useState, useEffect } from "react"
import axiosInstance from "@/utils/axiosInstance"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { handleError } from "@/utils/errorHandler"
import useAuthStore from "@/features/auth/store/authStore"

interface FundraiseStatistics {
  total_fundraises: number
  live_fundraises: number
  completed_fundraises: number
  total_amount_raised: number
  total_goal_amount: number
  average_completion_percentage: number
  total_investors: number
  total_investments: number
  average_donation_amount: number
  largest_single_donation: number
  smallest_single_donation: number
}

const FundraiseStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<FundraiseStatistics | null>(null)
  const { user } = useAuthStore()

  useEffect(() => {
    if (user) {
      fetchStatistics()
    }
  }, [user])

  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get("/charity/fundraise/statistics")
      setStatistics(response.data.payload)
    } catch (error) {
      handleError(error, "خطا در دریافت آمار صندوق‌های خیریه")
    }
  }

  if (!statistics) {
    return <div>در حال بارگذاری...</div>
  }
console.log(statistics)
  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-center">آمار صندوق‌های خیریه</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="صندوق‌های جمع‌آوری کمک" icon="📊">
          <StatItem label="کل" value={statistics.total_fundraises} />
          <StatItem label="فعال" value={statistics.live_fundraises} />
          <StatItem label="تکمیل شده" value={statistics.completed_fundraises} />
        </StatCard>
        <StatCard title="مبالغ" icon="💰">
          <StatItem label="کل جمع‌آوری شده" value={`${statistics.total_amount_raised.toFixed(2)} تومان`} />
          <StatItem label="هدف کل" value={`${statistics.total_goal_amount.toFixed(2)} تومان`} />
          <StatItem label="میانگین تکمیل" value={`${statistics.average_completion_percentage.toFixed(2)}٪`} />
        </StatCard>
        <StatCard title="نیکوکاری ها" icon="🤝">
          <StatItem label="تعداد کل سرمایه‌گذاران" value={statistics.total_investors} />
          <StatItem label="تعداد کل نیکوکاری ها" value={statistics.total_investments} />
          <StatItem label="میانگین کمک" value={`${statistics.average_donation_amount.toFixed(2)} تومان`} />
        </StatCard>

      </div>
    </div>
  )
}

const StatCard: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center text-lg">
        <span className="ml-2">{icon}</span>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between items-center mb-2">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold">{value}</span>
  </div>
)

export default FundraiseStatistics
