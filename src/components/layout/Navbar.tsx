// src/components/layout/Navbar.tsx

import { useState, useEffect } from "react"
import { User } from "lucide-react"
import useCategoryStore from "@/features/category/store/categoryStore"
import useAuthStore from "@/features/auth/store/authStore"
import { Category } from "@/types/category"
import { Button } from "@/components/ui/button"
import CategorySelectModal from "@/components/shared/CategorySelectModal"
import MenuBar from "./MenuBar"
import Modal from "@/components/common/Modal"
import Auth from "@/features/auth/components/Auth"
import { Link } from "react-router-dom"
import History from "./History"
import SearchBar from "@/components/search/SearchBar"

export default function Navbar() {
  const { fetchCategories, categories } = useCategoryStore()
  const { token, user } = useAuthStore()
  const [isMobile, setIsMobile] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    fetchCategories()
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [fetchCategories])

  useEffect(() => {
    if (token) {
      setIsAuthModalOpen(false)
    }
  }, [token])

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category)
    setIsCategoryModalOpen(true)
  }

  const handleAuthClick = () => {
    setIsAuthModalOpen(true)
  }

  const handleProfileClick = () => {}

  return (
    <>
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex w-full gap-2 items-center">
              <a href="http://127.0.0.1:5173" className="cursor-pointer">
                <img src="/img/logo.svg" alt="Logo" className="h-14 -mb-1" />
              </a>
              {!isMobile && (
                <div className="flex w-full justify-between gap-6 items-center">
                  <MenuBar categories={categories} onCategoryClick={handleCategoryClick} />
                  <SearchBar />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              {token ? (
                <div className="flex gap-2">
                  <History />
                  {user?.role == "charity" && (
                    <Link to="/charity/fundraises/create" type="button" className="bg-[#41032f] text-[#ffffff] h-10 px-4 flex gap-2 items-center justify-center w-max font-medium rounded-full">
                      مدیریت خیریه
                    </Link>
                  )}
                  {user?.role == "admin" && (
                    <Link to="/admin" type="button" className="bg-[#e9b408] text-[#ffffff] h-10 px-4 flex gap-2 items-center justify-center w-max font-medium rounded-full">
                      پنل ادمین
                    </Link>
                  )}

                  <Link to="/profile/edit" type="button" className="bg-[#bdd9ef] text-[#1968a0] h-10 px-4 flex gap-2 items-center justify-center w-max font-medium rounded-full" onClick={handleProfileClick}>
                    <User size={18} color="#1968a0"></User>
                    <div>پروفایل</div>
                  </Link>
                </div>
              ) : (
                <Button type="button" className="bg-[#5432a1] h-10 px-4 flex gap-2 items-center justify-center w-max bg-opacity-30 text-[#5432a1] font-medium rounded-full" onClick={handleAuthClick}>
                  <User size={18} color="#5432a1"></User>
                  <div>ورود/ثبت نام</div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedCategory && <CategorySelectModal isModalOpen={isCategoryModalOpen} setIsModalOpen={setIsCategoryModalOpen} category={selectedCategory} />}

      <Modal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onConfirm={() => setIsAuthModalOpen(false)} 
        default_buttons={false}
      >
        <Auth />
      </Modal>
    </>
  )
}