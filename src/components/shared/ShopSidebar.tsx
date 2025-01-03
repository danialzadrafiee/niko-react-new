import React, { useState } from "react"
import { Category } from "@/types/category"
import CategoryFilter from "./CategoryFilter"
import FilterOptions, { FilterOption } from "./FilterOptions"
import { Menu, X } from "lucide-react"

interface ShopSidebarProps {
  categories: Category[]
  activeMainCategory: number | null
  activeSecondCategory: number | null
  setActiveMainCategory: (id: number | null) => void
  setActiveSecondCategory: (id: number | null) => void
  handleCategoryClick: (category: Category) => void
  filters: Record<string, string>
  filterOptions: FilterOption[]
  onFilterChange: (key: string, value: string) => void
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ categories, handleCategoryClick, filters, filterOptions, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-12 right-4 z-50 bg-[#5432a1] text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 lg:top-4 
        h-full lg:h-auto 
        w-[280px] lg:w-64 
        bg-white shadow-lg rounded-lg overflow-hidden 
        transition-transform duration-300 ease-in-out
        z-50 lg:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="bg-[#5432a1] text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">فیلتر و دسته‌بندی</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="h-[calc(100vh-64px)] lg:h-auto overflow-y-auto">
          <FilterOptions filters={filters} filterOptions={filterOptions} onFilterChange={onFilterChange} />
          <CategoryFilter
            categories={categories}
            handleCategoryClick={(category) => {
              handleCategoryClick(category)
              setIsOpen(false)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ShopSidebar
