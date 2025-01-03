import React from "react"
import cn from "classnames"
import numeral from "numeral"
import moment from "jalali-moment"
import { getImageUrl } from "../../utils/env"

interface CardProps {
  variant: "fundraise" | "product"
  data: any
}

const Card: React.FC<CardProps> = ({ variant, data }) => {
  const isRaiseCard = variant === "fundraise"

  return (
    <div className="bg-white shadow rounded-lg w-full sm:w-[200px] lg:w-auto">
      <div>
        <header>
          <div className={cn("rounded-t-lg", isRaiseCard ? "fade" : "")}>
            <img src={getImageUrl(data.picture)} alt={data.title} className={cn("object-cover w-full rounded-t-lg", isRaiseCard ? "h-[180px] sm:h-[200px] lg:h-[180px]" : "h-[200px] sm:h-[250px] lg:h-[300px]")} />
          </div>
        </header>
        <section className="px-3 sm:px-4 lg:px-6">{isRaiseCard ? <RaiseCardContent data={data} /> : <NormalCardContent data={data} />}</section>
      </div>
      {isRaiseCard && <RaiseCardFooter data={data} />}
    </div>
  )
}

const RaiseCardContent: React.FC<{ data: any }> = ({ data }) => (
  <div className="grid w-full">
    <h2 className="font-bold py-2 border-b text-sm sm:text-base">{data.title}</h2>
    <div className="grid w-full grid-cols-2 py-2 pb-0 sm:pb-2">
      <div className="flex order-1 col-span-3 sm:col-span-1">
        <span className="text-[#5A30A7] text-xs">جمع شده :</span>
        <span className="text-[#5A30A7] text-xs">{numeral(data.price_collected).format("0,0")}</span>
      </div>
      <div className="order-2 w-full col-span-2">
        <div className="col-span-2 my-2 h-[8px] w-full bg-gray-200 rounded-full">
          <div className="h-full bg-primary rounded-full mr-auto transition-all duration-300" style={{ width: `${(data.price_collected / data.price_total) * 100}%` }}></div>
        </div>
      </div>
      <div className="flex order-3 col-span-2 sm:col-span-1mt-2 sm:mt-0">
        <span className="text-xs">مانده :</span>
        <span className="text-xs">{numeral(Math.ceil(data.price_total) - Math.ceil(data.price_collected)).format("0,0")}</span>
      </div>
    </div>
  </div>
)

const NormalCardContent: React.FC<{ data: any }> = ({ data }) => (
  <div className="flex items-center justify-between py-2 sm:py-4">
    <h2 className="font-bold max-w-28 truncate text-sm sm:text-base">{data.title}</h2>
    <div className="flex justify-end">
      <span className="text-xs sm:text-sm">{numeral(data.price).format("0,0") ?? ""}تومان</span>
    </div>
  </div>
)

const RaiseCardFooter: React.FC<{ data: any }> = ({ data }) => (
  <footer className="pb-3 pt-2 sm:pb-4 sm:pt-0">
    <div className="grid grid-cols-4 sm:grid-cols-4 gap-y-3 text-xs px-3 sm:px-4 lg:px-6">
      <div className="block sm:hidden opacity-10 h-[1px] w-full bg-base-content col-span-4"></div>
      <FooterItem label="تکمیل" value={`${Math.ceil((data.price_collected / data.price_total) * 100)}%`} />
      <FooterItem label="روز پیش" value={Math.round(moment().diff(moment(data.created_at, "YYYY-MM-DD"), "days", true))} />
      <FooterItem label="بانی" value={data.invests.length} />
      <FooterItem label="روز مانده" value={Math.round(moment(data.deadline, "YYYY-MM-DD").diff(moment(), "days", true))} />
    </div>
  </footer>
)

const FooterItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="text-center sm:border-t sm:pt-4">
    <div className="font-bold">{value}</div>
    <span>{label}</span>
  </div>
)

export default Card
