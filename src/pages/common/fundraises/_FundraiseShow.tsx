import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchFundraise } from "@/features/fundraise/services/fundraiseService"
import { Fundraise } from "@/types/fundraise"
import useInvestStore from "@/features/invest/store/investStore"
import { investInitialValues } from "@/features/invest/schemas/investSchema"
import Footer from "@/components/layout/Footer"
import { handleError } from "@/utils/errorHandler"
import FundraiseHeader from "./FundraiseHeader"
import FundraiseProgress from "./FundraiseProgress"
import InvestForm from "./InvestForm"
import Status from "./Status"
import { getImageUrl } from "@/utils/env"

const FundraiseShow: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [fundraise, setFundraise] = useState<Fundraise | null>(null)
  const [loading, setLoading] = useState(true)
  const { createInvest } = useInvestStore()
  useEffect(() => {
    const loadFundraise = async () => {
      try {
        setLoading(true)
        const data = await fetchFundraise(Number(id))
        setFundraise(data)
      } catch (error) {
        handleError(error, "Failed to load fundraise details")
      } finally {
        setLoading(false)
      }
    }
    loadFundraise()
  }, [id])

  const handleInvest = async (values: typeof investInitialValues, { setSubmitting, resetForm }: any) => {
    if (fundraise) {
      try {
        await createInvest({
          fundraise_id: fundraise.id,
          ...values,
        })
        const updatedFundraise = await fetchFundraise(Number(id))
        setFundraise(updatedFundraise)
        resetForm()
      } catch (error) {
        handleError(error, "Failed to create investment")
      } finally {
        setSubmitting(false)
      }
    }
  }

  const calculateTimeLeft = (deadline: string) => {
    const difference = +new Date(deadline) - +new Date()
    return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!fundraise) {
    return (
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Fundraise not found</span>
      </div>
    )
  }
  console.log(fundraise) 

  const daysLeft = calculateTimeLeft(fundraise.deadline)
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex [@media(max-width:400px)]:grid gap-[24px] w-full">
        <div className="w-[324px] [@media(max-width:400px)]:order-2 [@media(max-width:400px)]:w-full shrink-0">
          <FundraiseHeader picture={fundraise.picture} title={fundraise.title} location="تهران" />
        </div>
        <div className="flex-grow">
          <div>
            <section>
              <div className="grid">
                <div className="flex justify-between">
                  <Status status={fundraise.status} />
                </div>
                <div className="text-xl font-semibold">{fundraise.title}</div>
                <div className="pt-2">{fundraise.describe}</div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-2 [@media(max-width:400px)]:grid-cols-1 mt-8">
                <div className="flex items-center gap-2">
                  <img src={getImageUrl(fundraise.picture)} className="size-[80px] rounded-xl" />
                  <div className="grid h-max">
                    <div className="text-xl font-semibold">{fundraise.product?.title}</div>
                    <div className="flex mt-1">
                      <div className="pe-1">{fundraise.amount}</div>
                      <div>عدد</div>
                      <div className="mr-2">{fundraise.product?.title}</div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2 pr-10 [@media(max-width:400px)]:pr-0 [@media(max-width:400px)]:pt-5 [@media(max-width:400px)]:border-b">
                  <InvestForm onSubmit={handleInvest} fundraiseStatus={fundraise.status} remainingAmount={fundraise.remaining_amount} />
                </div>
              </div>
            </section>
          </div>
          <div className="divider"></div>
          <FundraiseProgress priceCollected={fundraise.price_collected} priceTotal={fundraise.price_total} investCount={fundraise.invests?.length || 0} daysLeft={daysLeft} />
        </div>
      </div>
      <Footer className="mt-20" />
    </div>
  )
}

export default FundraiseShow
