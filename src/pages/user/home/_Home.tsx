import HomeAbout from "./HomeAbout"
import HomeCarousel from "./HomeCrausel"
import useHomeStore from "@/features/home/store/homeStore"
import SideMenu from "./SideMenu"
import { useEffect } from "react"
import Footer from "@/components/layout/Footer"
import FundraiseFeature from "@/components/shop/FundraiseFeature"
import ProductFeature from "@/components/shop/ProductFeature"

export default function Home() {
  const { homeData, loading, fetchHomeData } = useHomeStore()

  useEffect(() => {
    fetchHomeData()
  }, [fetchHomeData])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!homeData) {
    return <div className="flex justify-center items-center h-screen">Error loading home page data</div>
  }

  return (
    <div className="w-full">
      <header className="w-full">
        <div className="flex flex-col md:flex-row gap-6 mx-auto max-w-7xl px-4 md:px-6">
          <SideMenu categories={homeData.selectedCategories} />
          <HomeCarousel carouselItems={homeData.carouselItems} />
        </div>
      </header>
      <main className="w-full">
        <section className=" md:px-6">
          <div className="grid gap-10 md:gap-20 mx-auto mt-5 md:mt-10 max-w-7xl">
            <div className="grid gap-10 md:gap-20">
              <div className="grid gap-10 md:gap-20">
                <FundraiseFeature variant="fundraise_special" title="کمک های نزدیک به تکمیل " sortBy="mostly_collected" sortOrder="desc" excludeStatuses={["dead", "rejected", "filled", "withdraw_requested", "withdraw_done"]} />
                <FundraiseFeature variant="fundraise_normal" title="جدیدترین نیکوکاری های گروهی" supTitle="جدید ترین صندوق های خیریه" sortBy="created_at" sortOrder="desc" excludeStatuses={["dead", "rejected", "filled"]} />
              </div>
            </div>
            <ProductFeature sortBy="created_at" title="جدیدترین نیکوکاری های انفرادی" supTitle="جدید ترین ایتم های مهربانی کامل" />
            <HomeAbout />
          </div>
        </section>
      </main>
      <div className="max-w-7xl mx-auto mt-20">
        <Footer />
      </div>
    </div>
  )
}
