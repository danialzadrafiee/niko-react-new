import React, { useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, FolderTree, Users, Menu, X, LogOut, ListOrdered, BarChart2, HeartHandshake, Sliders, BoxIcon, Ticket } from "lucide-react"
import { Toaster } from "react-hot-toast"
import useAuthStore from "@/features/auth/store/authStore"

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { logout } = useAuthStore()

  const navigate = useNavigate()
  const navItems = [
    { path: "/admin", label: "داشبورد", icon: LayoutDashboard },
    { path: "/admin/users", label: "مدیریت کاربران", icon: Users },
    { path: "/admin/products/create", label: "ایجاد خدمت", icon: Package },
    { path: "/admin/products/list", label: "لیست خدمات", icon: ListOrdered },
    { path: "/admin/products/statistics", label: "آمار خدمات", icon: BarChart2 },
    { path: "/admin/fundraises/list", label: "لیست صندوق ها", icon: BoxIcon },
    { path: "/admin/charities/statistics", label: "آمار  خیریه‌ها", icon: HeartHandshake },
    { path: "/admin/categories", label: "دسته‌بندی‌ها", icon: FolderTree },
    { path: "/admin/carousel", label: "مدیریت کاروسل", icon: Sliders },
    { path: "/admin/tickets", label: "مدیریت تیکت ها", icon: Ticket },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div
        className={`bg-[#5432a1] text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 z-20 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div>
          <Link to="/admin" className="text-white flex items-center space-x-2 px-4">
            <LayoutDashboard className="h-8 w-8" />
            <span className="text-2xl font-extrabold">پنل مدیریت</span>
          </Link>

          <nav className="mt-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
                  location.pathname === item.path ? "bg-white bg-opacity-20 text-white" : "hover:bg-white hover:bg-opacity-10 text-gray-300 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout button */}
        <div className="mt-auto">
          <Button
            onClick={() => {
              logout()
              navigate("/")
            }}
            variant="ghost"
            className="w-full text-white hover:bg-white hover:bg-opacity-10 flex items-center justify-start px-4 py-2.5"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>خروج</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:hidden">
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild className="flex items-center">
                <Link to="/">
                  <LogOut className="h-4 w-4 mr-2" />
                  بازگشت به سایت اصلی
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
