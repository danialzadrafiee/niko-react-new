// /home/dante/Projects/nikoono/react/src/components/layout/Layout.tsx

import React, { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./Navbar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, FileText, Phone, AlignJustify } from "lucide-react"

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home")
  const navigate = useNavigate()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    switch (value) {
      case "home":
        navigate("/")
        break
      case "pages":
        navigate("/pages")
        break
      case "contact":
        navigate("/contact")
        break
      case "categories":
        navigate("/categories/mobile")
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-grow container mx-auto mt-4 mb-16 lg:mb-0">
        <Outlet />
      </main>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 lg:hidden">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home">
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </TabsTrigger>
          <TabsTrigger value="pages">
            <FileText className="h-5 w-5" />
            <span className="sr-only">Pages</span>
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="categories">
            <AlignJustify className="h-5 w-5" />
            <span className="sr-only">Categories</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default Layout
