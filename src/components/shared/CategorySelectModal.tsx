import { Category } from "@/types/category"
import { Link, useNavigate } from "react-router-dom"
import { Dialog, DialogPanel } from '@headlessui/react'
import { X } from "lucide-react";

export default function CategorySelectModal({ isModalOpen, setIsModalOpen, category }: { isModalOpen: boolean; setIsModalOpen: (value: boolean) => void; category: Category }) {
  const navigate = useNavigate()

  const handleLinkClick = (path: string) => {
    setIsModalOpen(false)
    navigate(path)
  }


  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white">
          <div className="relative">
            <Link 
              to={`/products/list/${category.id}`}
              onClick={() => handleLinkClick(`/products/list/${category.id}`)}
              className="block h-48 bg-cover bg-center rounded-t-lg relative group"
              style={{ backgroundImage: "url('/img/individual.webp')" }}
            >
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4 text-right">

              <h2 className="text-lg font-bold mb-2 text-white">میخواهم به تنهایی کمک کنم</h2>


                <span className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                 مشاهده خدمات
                </span>
              </div>
            </Link>
            <Link 
              to={`/fundraises/list/${category.id}`}
              onClick={() => handleLinkClick(`/fundraises/list/${category.id}`)}
              className="block h-48 bg-cover bg-center rounded-b-lg relative group"
              style={{ backgroundImage: "url('/img/group.webp')" }}
            >
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 right-4 text-right">

              <h2 className="text-lg font-bold mb-2 text-white">میخواهم با مشارکت دیگران کمک کنم</h2>


                <span className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
                  مشاهده صندوق ها
                </span>
              </div>
            </Link>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
