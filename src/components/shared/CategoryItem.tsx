// src/components/shared/CategoryItem.tsx
import { useState } from "react"
import { Category } from "@/types/category"
import CategorySelectModal from "./CategorySelectModal"
import { getImageUrl } from "@/utils/env"

interface CategoryItemProps {
  category: Category
  isActive: boolean
  onClick?: () => void
  imageSize?: number
  openModal?: boolean
  variant?: "circle" | "rounded" | "navbar"
}

export function CategoryItem({ category, onClick, variant = "navbar", openModal = false }: CategoryItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (openModal) {
      setIsModalOpen(true)
    }
    onClick?.()
  }

  return (
    <>
      <div className="flex flex-col items-center text-center text-xs lg:text-base gap-2 cursor-pointer" onClick={handleClick}>
        {variant != "navbar" && (
          <img
            src={getImageUrl(category.image)}
            className={`w-full max-w-[160px] object-cover aspect-square  hover:brightness-125 ${variant === "circle" ? "rounded-full" : variant == "rounded" ? "rounded-[20px]" : ""}`}
            alt={category.name}
          />
        )}
        <div className={variant === "navbar" ? "font-base" : "font-bold [@media(max-width:400px)]:text-xs"}>{category.name}</div>
      </div>
      {openModal && <CategorySelectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} category={category} />}
    </>
  )
}
