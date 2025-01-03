import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CharityStatistics } from "./types"
import FundraiseCard from "./FundraiseCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import numeral from "numeral"

interface CharityDetailsDialogProps {
  charity: CharityStatistics | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onViewFundraiseDetails: (fundraise: any) => void
}

const CharityDetailsDialog: React.FC<CharityDetailsDialogProps> = ({ charity, isOpen, onOpenChange, onViewFundraiseDetails }) => {
  if (!charity) return null
  const formatCurrency = (value: number) => numeral(value).format("0,0") + " تومان"
  const formatPercentage = (value: number) => numeral(value).format("0.00") + "%"

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary mb-4">جزئیات خیریه</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(90vh-100px)]">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <Section title="اطلاعات کلی">
                <InfoItem label="نام خیریه" value={charity.charity_name || `خیریه ${charity.charity_id}`} />
                <InfoItem label="کل صندوق‌ها" value={charity.total_fundraises} />
                <InfoItem label="صندوق‌های فعال" value={charity.live_fundraises} />
                <InfoItem label="صندوق‌های تکمیل شده" value={charity.completed_fundraises} />
              </Section>

              <Section title="آمار مالی">
                <InfoItem label="کل مبلغ جمع‌آوری شده" value={formatCurrency(charity.total_amount_raised)} />
                <InfoItem label="هدف کل" value={formatCurrency(charity.total_goal_amount)} />
                <InfoItem label="میانگین تکمیل" value={formatPercentage(charity.average_completion_percentage)} />
                <InfoItem label="میانگین کمک" value={formatCurrency(charity.average_donation_amount)} />
                <InfoItem label="بزرگترین کمک" value={formatCurrency(charity.largest_single_donation)} />
                <InfoItem label="کوچکترین کمک" value={formatCurrency(charity.smallest_single_donation)} />
              </Section>

              <Section title="آمار مشارکت‌کنندگان">
                <InfoItem label="تعداد سرمایه‌گذاران" value={charity.total_investors} />
                <InfoItem label="تعداد کل نیکوکاری ها" value={charity.total_investments} />
              </Section>
            </div>
          </ScrollArea>

          <ScrollArea className="h-full pl-4">
            <div className="space-y-6">
              <Section title="صندوق‌های درصد تکمیل بالاتر">
                <FundraiseCard fundraise={charity.most_successful_fundraise} title="موفق‌ترین صندوق" onViewDetails={onViewFundraiseDetails} />
                <FundraiseCard fundraise={charity.least_successful_fundraise} title="کم‌موفق‌ترین صندوق" onViewDetails={onViewFundraiseDetails} />
              </Section>

              <Section title=" صندوق هایی با پول بیشتر">
                {charity.top_fundraises.map((fundraise, index) => (
                  <FundraiseCard key={fundraise.id} fundraise={fundraise} title={`صندوق برتر ${index + 1}`} onViewDetails={onViewFundraiseDetails} />
                ))}
              </Section>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-secondary/10 rounded-lg p-4 shadow-sm">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
)

const InfoItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-medium">{label}:</span>
    <span className="font-bold">{value}</span>
  </div>
)

export default CharityDetailsDialog
