import { Flame } from "lucide-react"

const ShopFeaturedBreak = ({ title, supTitle }: { title: string; supTitle: string | undefined }) => {
  const VisitButton = ({ className }: { className: string }) => {
    return (
      <div className={className}></div>
      // <button type="button" className={`${className} bg-primary text-sm h-max rounded-full px-2 sm:px-3 py-1 sm:py-2 text-white`}>
      //   مشاهده همه
      // </button>
    )
  }

  return (
    <div className="h-auto sm:h-[80px] w-full">
      <div className="w-full">
        <div className="relative w-full">
          <div className="bg-primary/20 absolute  justify-between flex pointer-events-none items-center px-4 rounded-full  h-full w-full"></div>
          <div className="px-4 sm:px-[36px] flex lg:py-4 lg:items-center justify-between rounded-full py-4 sm:py-0 h-auto w-full">
            <div className="flex items-center gap-3 sm:gap-5">
              <Flame size={24} color="#5a30a7" />
              <div className="grid gap-1">
                <div className="text-xs sm:text-sm">{supTitle}</div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm sm:text-base font-black text-primary">{title}</div>
                </div>
              </div>
            </div>
            <VisitButton className="mt-2 sm:mt-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopFeaturedBreak
