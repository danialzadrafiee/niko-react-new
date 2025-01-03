import React, { useState, useEffect } from "react"
import axiosInstance from "@/utils/axiosInstance"
import { handleError } from "@/utils/errorHandler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, RefreshCw } from "lucide-react"
import CharityTable from "./CharityTable"
import CharityDetailsDialog from "./CharityDetailsDialog"
import FundraiseDetailsDialog from "./FundraiseDetailsDialog"
import { CharityStatistics, Fundraise } from "./types"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import numeral from "numeral"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CharitiesStatistics: React.FC = () => {
  const [statistics, setStatistics] = useState<CharityStatistics[]>([])
  const [filteredStatistics, setFilteredStatistics] = useState<CharityStatistics[]>([])
  const [selectedCharity, setSelectedCharity] = useState<CharityStatistics | null>(null)
  const [isCharityDialogOpen, setIsCharityDialogOpen] = useState(false)
  const [selectedFundraise, setSelectedFundraise] = useState<Fundraise | null>(null)
  const [isFundraiseDialogOpen, setIsFundraiseDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  console.log(statistics)
  useEffect(() => {
    fetchStatistics()
  }, [])

  useEffect(() => {
    const filtered = statistics.filter((charity) => charity.charity_name?.toLowerCase().includes(searchTerm.toLowerCase()) || charity.charity_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredStatistics(filtered)
  }, [searchTerm, statistics])

  const fetchStatistics = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get("/admin/charities/statistics")
      setStatistics(response.data.payload)
      setFilteredStatistics(response.data.payload)
    } catch (error) {
      handleError(error, "خطا در دریافت آمار خیریه‌ها")
      setError("خطا در دریافت آمار خیریه‌ها. لطفا دوباره تلاش کنید.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewCharityDetails = (charity: CharityStatistics) => {
    setSelectedCharity(charity)
    setIsCharityDialogOpen(true)
  }

  const handleViewFundraiseDetails = (fundraise: Fundraise) => {
    setSelectedFundraise(fundraise)
    setIsFundraiseDialogOpen(true)
  }

  const chartData = {
    labels: filteredStatistics.map((charity) => charity.charity_name || `خیریه ${charity.charity_id}`),
    datasets: [
      {
        label: "مبلغ جمع‌آوری شده",
        data: filteredStatistics.map((charity) => charity.total_amount_raised),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "هدف",
        data: filteredStatistics.map((charity) => charity.total_goal_amount),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "مقایسه مبلغ جمع‌آوری شده و هدف خیریه‌ها",
      },
    },
  }
  const formatCurrency = (value: number) => numeral(value).format("0,0") + " تومان"
  const formatPercentage = (value: number) => numeral(value).format("0.00") + "%"

  return (
    <div className="bg-white rounded-lg mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-center">آمار همه خیریه‌ها</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-600">تعداد کل خیریه‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-800">{statistics.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-600">مجموع صندوق‌های فعال</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-800">{statistics.reduce((sum, charity) => sum + charity.live_fundraises, 0)}</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-600">مجموع مبلغ جمع‌آوری شده</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-800">{formatCurrency(statistics.reduce((sum, charity) => sum + charity.total_amount_raised, 0))}</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-600">میانگین تکمیل کل</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-800">{formatPercentage(statistics.reduce((sum, charity) => sum + charity.average_completion_percentage, 0) / statistics.length)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8 h-96">
            <Bar options={chartOptions} data={chartData} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <Input placeholder="جستجوی خیریه" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-64" />
            <Button onClick={fetchStatistics} className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" /> بروزرسانی آمار
            </Button>
          </div>

          <CharityTable statistics={filteredStatistics} onViewDetails={handleViewCharityDetails} />

          <CharityDetailsDialog charity={selectedCharity} isOpen={isCharityDialogOpen} onOpenChange={setIsCharityDialogOpen} onViewFundraiseDetails={handleViewFundraiseDetails} />

          <FundraiseDetailsDialog fundraise={selectedFundraise} isOpen={isFundraiseDialogOpen} onOpenChange={setIsFundraiseDialogOpen} />
        </>
      )}
    </div>
  )
}

export default CharitiesStatistics
