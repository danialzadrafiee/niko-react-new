import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState, useRef, useCallback } from "react"
import { useUserStore } from "@/features/user/store/userStore"
import useAuthStore from "@/features/auth/store/authStore"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HistoryIcon } from "lucide-react"
import { getImageUrl } from "@/utils/env"

export default function History() {
  const { fetchUserInvests, fetchUserPurchases, userInvests, userPurchases, isLoading } = useUserStore()
  const { user } = useAuthStore()
  const [investsPage, setInvestsPage] = useState(1)
  const [purchasesPage, setPurchasesPage] = useState(1)
  const investsLoader = useRef<HTMLDivElement>(null)
  const purchasesLoader = useRef<HTMLDivElement>(null)
  const perPage = 10
  const loadMoreInvests = useCallback(() => {
    if (user) {
      fetchUserInvests(user.id, investsPage, perPage)
    }
  }, [fetchUserInvests, user, investsPage, perPage])

  const loadMorePurchases = useCallback(() => {
    if (user) {
      fetchUserPurchases(user.id, purchasesPage, perPage)
    }
  }, [fetchUserPurchases, user, purchasesPage, perPage])

  useEffect(() => {
    loadMoreInvests()
    loadMorePurchases()
  }, [loadMoreInvests, loadMorePurchases])

  useEffect(() => {
    const observerInvests = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setInvestsPage((prev) => prev + 1)
        }
      },
      { rootMargin: "20px", threshold: 0 }
    )

    const observerPurchases = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPurchasesPage((prev) => prev + 1)
        }
      },
      { rootMargin: "20px", threshold: 0 }
    )

    const currentInvestsLoader = investsLoader.current
    const currentPurchasesLoader = purchasesLoader.current

    if (currentInvestsLoader) observerInvests.observe(currentInvestsLoader)
    if (currentPurchasesLoader) observerPurchases.observe(currentPurchasesLoader)

    return () => {
      if (currentInvestsLoader) observerInvests.unobserve(currentInvestsLoader)
      if (currentPurchasesLoader) observerPurchases.unobserve(currentPurchasesLoader)
    }
  }, [isLoading])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <Button variant="primary" size="icon" className="rounded-full">
            <HistoryIcon className="h-4 w-4" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-md md:max-w-lg !p-0 !m-0">
        <SheetHeader className="hidden">
          <SheetTitle>تاریخچه</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="fundraise" dir="rtl" className="w-full">
          <TabsList className="w-full h-16 p-0 m-0 flex border-0">
            <TabsTrigger
              className="w-full rounded-none h-16 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:bg-[#5432a1] data-[state=active]:text-white"
              value="purchases"
            >
              کمک های فردی
            </TabsTrigger>
            <TabsTrigger
              className="w-full rounded-none h-16 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:bg-[#5432a1] data-[state=active]:text-white"
              value="fundraise"
            >
              کمک های جمعی
            </TabsTrigger>
          </TabsList>
          <TabsContent value="fundraise" className="p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="space-y-6">
              {userInvests?.payload?.data.map((invest) => (
                <div key={invest.id} className="bg-gray-50 p-4 w-full mx-auto rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2 items-center">
                      <img src={getImageUrl(invest.fundraise.picture)} alt={invest.fundraise.title} className="rounded-full size-[50px] mr-2" />
                      <div>
                        <h2 className="text-lg font-semibold">{invest.fundraise.title}</h2>
                        <div className="text-sm text-gray-500 flex items-center">
                          <i className="far fa-clock mr-1"></i>
                          <span>{new Date(invest.created_at).toLocaleString("fa-IR", { hour: "2-digit", minute: "2-digit", weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-red-500">
                      <i className="fas fa-heart"></i>
                    </div>
                  </div>
                  <div className="border-t border-b py-4 my-4">
                    <progress className="progress progress-primary w-full" value={invest.fundraise.completion_percentage} max="100"></progress>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span>جمع شده: </span>
                        <span className="text-sm">{((invest.fundraise.completion_percentage * invest.amount) / 100).toLocaleString()} تومان</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>مانده: </span>
                        <span className="text-sm">{(invest.amount - (invest.fundraise.completion_percentage * invest.amount) / 100).toLocaleString()} تومان</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <SheetClose asChild>
                      <Link to={`/fundraises/${invest.fundraise.id}`}>
                        <Button variant="primary" size="default">
                          وضعیت
                        </Button>
                      </Link>
                    </SheetClose>

                    <div className="text-gray-700">
                      <span>واریز شما :</span>
                      <span className="font-bold"> {invest.amount.toLocaleString()} تومان</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {isLoading && <div>Loading...</div>}
            <div ref={investsLoader} />
          </TabsContent>
          <TabsContent value="purchases" className="p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="space-y-6">
              {userPurchases?.payload.map((purchase) => (
                <div key={purchase.id} className="bg-gray-50 p-4 w-full mx-auto rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2 items-center">
                      <img src={getImageUrl(purchase.product.picture)} alt={purchase.product.title} className="rounded-full size-[50px] mr-2" />
                      <div>
                        <h2 className="text-lg font-semibold">{purchase.product.title}</h2>
                        <div className="text-sm text-gray-500 flex items-center">
                          <i className="far fa-clock mr-1"></i>
                          <span>{new Date(purchase.created_at).toLocaleString("fa-IR", { hour: "2-digit", minute: "2-digit", weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-700">
                      <span>مبلغ خرید:</span>
                      <span className="font-bold"> {purchase.total_price.toLocaleString()} تومان</span>
                    </div>
                    <div className="text-gray-700">
                      <span>تعداد:</span>
                      <span className="font-bold"> {purchase.quantity}</span>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Link to={`/products/${purchase.product.id}`}>
                      <Button variant="primary" size="default">
                        مشاهده خدمت
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              ))}
            </div>
            {isLoading && <div>Loading...</div>}
            <div ref={purchasesLoader} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
