// src/pages/user/mobile/_MobileCategories.tsx
import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import useCategoryStore from "@/features/category/store/categoryStore"
import { Category } from "@/types/category"
import { CategoryItem } from "@/components/shared/CategoryItem"
import CategorySelectModal from "@/components/shared/CategorySelectModal"
import { getImageUrl } from "@/utils/env"

export default function MobileCategories() {
  const { fetchCategories, categories } = useCategoryStore()
  const [activeMainCategory, setActiveMainCategory] = useState<number | null>(null)
  const [activeSecondCategory, setActiveSecondCategory] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (categories.length > 0 && activeMainCategory === null) {
      setActiveMainCategory(categories[0].id)
    }
  }, [categories, activeMainCategory])

  const handleLastCategoryClick = (category: Category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="fixed inset-0 bg-white z-40 flex">
        {/* Main categories - 1/5 width on the right */}
        <div className="w-1/5 bg-gray-100 overflow-y-auto">
          {categories.map((category: Category) => (
            <div key={category.id} className={`p-4 cursor-pointer ${activeMainCategory === category.id ? "bg-primary text-white" : ""}`} onClick={() => setActiveMainCategory(category.id)}>
              <img src={getImageUrl(category.image)} alt={category.name} className="w-10 h-10 rounded-full mx-auto mb-2" />
              <div className="text-xs text-center truncate">{category.name}</div>
            </div>
          ))}
        </div>

        {/* Second and last level categories - 4/5 width on the left */}
        <div className="w-4/5 overflow-y-auto">
          {activeMainCategory !== null &&
            categories
              .find((c: Category) => c.id === activeMainCategory)
              ?.children?.map((secondCategory: Category) => (
                <div key={secondCategory.id} className="border-b">
                  <div className="flex items-center justify-between p-4" onClick={() => setActiveSecondCategory(activeSecondCategory === secondCategory.id ? null : secondCategory.id)}>
                    <span className="font-medium">{secondCategory.name}</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${activeSecondCategory === secondCategory.id ? "rotate-90" : ""}`} />
                  </div>
                  {activeSecondCategory === secondCategory.id && secondCategory.children && (
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
                      {secondCategory.children.map((lastCategory: Category) => (
                        <CategoryItem key={lastCategory.id} category={lastCategory} isActive={false} onClick={() => handleLastCategoryClick(lastCategory)} variant="circle" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>

      {selectedCategory && <CategorySelectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} category={selectedCategory} />}
    </>
  )
}
