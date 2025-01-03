import React, { useState, useEffect } from "react"
import { Category } from "@/types/category"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useParams } from "react-router-dom"

interface CategoryFilterProps {
  categories: Category[]
  handleCategoryClick: (category: Category) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, handleCategoryClick }) => {
  const { id } = useParams<{ id: string }>()
  const [openCategories, setOpenCategories] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  useEffect(() => {
    if (id) {
      const categoryId = parseInt(id, 10)
      setActiveCategory(categoryId)
      const parentIds = findParentIds(categories, categoryId)
      setOpenCategories([...parentIds, categoryId])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, categories])

  const findParentIds = (cats: Category[], targetId: number, path: number[] = []): number[] => {
    for (const cat of cats) {
      if (cat.id === targetId) return path
      if (cat.children && cat.children.length > 0) {
        const result = findParentIds(cat.children, targetId, [...path, cat.id])
        if (result.length > 0) return result
      }
    }
    return []
  }

  const toggleCategory = (category: Category) => {
    setOpenCategories((prev) => (prev.includes(category.id) ? prev.filter((id) => id !== category.id) : [...prev, category.id]))
  }

  const renderCategory = (category: Category, depth: number = 0) => {
    const isOpen = openCategories.includes(category.id)
    const isActive = activeCategory === category.id
    const hasChildren = category.children && category.children.length > 0
    const isLeaf = depth === 2 // 3rd level (0-indexed)

    return (
      <div key={category.id} className={`border-b border-gray-200 last:border-b-0 ${depth > 0 ? "pr-4" : ""}`}>
        <button
          className={`
            w-full text-right py-4 lg:py-3 px-4 
            flex items-center justify-between 
            transition-colors
            touch-manipulation
            ${isActive ? "text-[#4f339b] font-bold bg-opacity-20" : "hover:text-[#4f339b]"}
            ${depth > 0 ? "text-sm" : "text-base"}
          `}
          onClick={() => {
            toggleCategory(category)
            if (isLeaf) {
              handleCategoryClick(category)
            }
          }}
        >
          <span className="font-medium line-clamp-2">{category.name}</span>
          {hasChildren && (
            <span className="flex items-center flex-shrink-0 mr-2">
              {isOpen ? (
                <ChevronUp className={`h-5 w-5 ${isActive ? "text-[#4f339b]" : "text-gray-600"}`} />
              ) : (
                <ChevronDown className={`h-5 w-5 ${isActive ? "text-[#4f339b]" : "text-gray-400"}`} />
              )}
            </span>
          )}
        </button>
        {isOpen && hasChildren && (
          <div className="animate-slideDown">
            {category.children!.map((childCategory) => renderCategory(childCategory, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-h-[calc(100vh-24rem)] lg:max-h-[calc(100vh-16rem)] overflow-y-auto overscroll-contain">
      {categories.map((category) => renderCategory(category))}
    </div>
  )
}

export default CategoryFilter
