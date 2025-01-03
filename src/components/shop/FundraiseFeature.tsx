import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Card from "@/components/shop/ShopCard"
import ShopFeaturedBreak from "./ShopFeaturedBreak"
import { fetchFundraises } from "@/features/fundraise/services/fundraiseService"
import { Fundraise } from "@/types/fundraise"

interface FundraiseFeatureProps {
  variant: "fundraise_special" | "fundraise_normal"
  title: string
  supTitle?: string
  sortBy: "mostly_collected" | "created_at" | "deadline"
  sortOrder?: "asc" | "desc"
  excludeStatuses: string[]
}

const FundraiseFeature: React.FC<FundraiseFeatureProps> = ({ variant, title, supTitle, sortBy, sortOrder = "desc", excludeStatuses }) => {
  const [fundraises, setFundraises] = useState<Fundraise[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = {
          page: 1,
          per_page: 4,
          sort_by: sortBy,
          sort_order: sortOrder,
          exclude_statuses: excludeStatuses,
        }
        const response = await fetchFundraises(params)
        setFundraises(response.data)
      } catch (error) {
        console.error("Error fetching fundraises:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sortBy, sortOrder, excludeStatuses])

  return (
    <div className="relative w-full">
      <div className={variant === "fundraise_special" ? "w-full lg:bg-none bg-[url(/img/shapeMobile.png)] bg-no-repeat lg:h-[460px] bg-right-top bg-cover" : ""}>
        {variant === "fundraise_special" && <img src="/img/shape1.png" className="hidden sm:block lg:h-[460px] absolute top-0 -z-10 left-0" alt="Background shape" />}
        <div className="px-0 sm:px-[88px] pt-[24px] sm:pt-12">
          {variant === "fundraise_special" ? (
            <header>
              <h1 className="sticky font-bold pr-[16px] sm:pr-0 text-2xl sm:text-4xl text-white">{title}</h1>
            </header>
          ) : (
            <div className="pr-[16px] sm:pr-0">
              <ShopFeaturedBreak title={title} supTitle={supTitle} />
            </div>
          )}
          <section className="overflow-x-scroll sm:overflow-x-visible w-[calc(100dvw-10px)] sm:w-auto">
            <div className="grid w-max lg:w-full grid-cols-4 pt-[24px] sm:pt-10 pb-4 sm:pb-0 pr-[16px] sm:pr-0 gap-[12px] sm:gap-[24px]">
              {loading ? (
                <div>در حال بارگذاری...</div>
              ) : (
                fundraises.map((fundraise) => (
                  <Link key={fundraise.id} to={`/fundraises/${fundraise.id}`} className="cursor-pointer">
                    <Card variant="fundraise" data={fundraise} />
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FundraiseFeature)
