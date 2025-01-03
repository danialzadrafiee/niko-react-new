import React from "react"

interface FundraiseProgressProps {
  priceCollected: number
  priceTotal: number
  investCount: number
  daysLeft: number
}

const FundraiseProgress: React.FC<FundraiseProgressProps> = ({ priceCollected, priceTotal, investCount, daysLeft }) => {
  const progressPercentage = (priceCollected / priceTotal) * 100

  return (
    <section>
      <div className="grid gap-1">
        <div className="flex justify-between">
          <div>
            <strong className="text-lg pe-1">{priceCollected}</strong>
            <span>تومان</span>
          </div>
          <div>{investCount} مشارکت</div>
        </div>
        <progress dir="ltr" className="progress progress-primary w-full" value={progressPercentage} max="100"></progress>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <span>{progressPercentage.toFixed(2)}%</span>
            <span>از</span>
            <span>{priceTotal} تومان</span>
          </div>
          <div>{daysLeft} روز مانده</div>
        </div>
      </div>
    </section>
  )
}

export default FundraiseProgress
