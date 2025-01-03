// src/App.tsx
import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import AdminLayout from "./components/layout/AdminLayout"
import CharityLayout from "./components/layout/CharityLayout"
import Home from "./pages/user/home/_Home"
import NotFound from "./pages/NotFound"
import Auth from "@/features/auth/components/Auth"
import useAuthStore from "./features/auth/store/authStore"
import { useEffect } from "react"
import AdminProductCreate from "./pages/admin/product/create/_AdminProductCreate"
import CategoryList from "./pages/admin/category/_CategoryList"
import FundraiseShow from "./pages/common/fundraises/_FundraiseShow"
import UserList from "./pages/admin/users/list/_AdminUsersList"
import AdminCarouselManagement from "./pages/admin/carousel/Management/_AdminCarouselManagement"
import MobileCategories from "./pages/user/mobile/_MobileCategories"
import FundraisesList from "./pages/common/fundraises/_FundraisesList"
import ProductList from "./pages/common/product/_ProductList"
import UserProfileEdit from "./pages/user/profile/_UserProfileEdit"
import ProductShow from "./pages/common/product/_ProductShow"
import FundraiseCreate from "./pages/charity/fundraise/create/_FundraiseCreate"
import FundraiseOwned from "./pages/charity/fundraise/owned/_FundraiseOwned"
import CharitiesStatistics from "./pages/admin/statistics/charity/_CharitiesStatistics"
import FundraiseStatistics from "./pages/charity/fundraise/statistics/_FundraiseStatistics"
import ProductsStatistics from "./pages/admin/statistics/product/_ProductsStatistics"
import AdminProductList from "./pages/admin/product/list/_AdminProductList"
import AdminProductEdit from "./pages/admin/product/edit/_AdminProductEdit"
import ProtectedCharityRoute from "./components/layout/ProtectedCharityRoute"
import AdminFundraiseList from "./pages/admin/fundraise/list/_AdminFundraiseList"
import AdminFundraiseEdit from "./pages/admin/fundraise/edit/_AdminFundraiseEdit"
import UserTickets from "./pages/user/tickets/_UserTickets"
import AdminTickets from "./pages/admin/tickets/_AdminTicketsx"

function App() {
  const { initializeAuth } = useAuthStore.getState()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        {/* Common Routes */}
        <Route path="auth" element={<Auth />} />
        <Route path="categories">
          <Route path="mobile" element={<MobileCategories />} />
        </Route>
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<ProductShow />} />
          <Route path="list/:id" element={<ProductList />} />
        </Route>
        <Route path="fundraises">
          <Route index element={<FundraisesList />} />
          <Route path=":id" element={<FundraiseShow />} />
          <Route path="list/:id" element={<FundraisesList />} />
        </Route>
        <Route path="profile">
          <Route path="edit" element={<UserProfileEdit />} />
        </Route>
        <Route path="tickets" element={<UserTickets />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Charity Routes */}
      <Route path="charity" element={<CharityLayout />}>
        <Route element={<ProtectedCharityRoute />}>
          <Route path="fundraises/create" element={<FundraiseCreate />} />
          <Route path="fundraises/owned" element={<FundraiseOwned />} />
          <Route path="statistics" element={<FundraiseStatistics />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<UserProfileEdit />} />
        <Route path="products/create" element={<AdminProductCreate />} />
        <Route path="products/list" element={<AdminProductList />} />
        <Route path="products/edit/:id" element={<AdminProductEdit />} />
        <Route path="fundraises/create" element={<FundraiseCreate />} />
        <Route path="fundraises/list" element={<AdminFundraiseList />} />
        <Route path="fundraises/edit/:id" element={<AdminFundraiseEdit />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="users" element={<UserList />} />
        <Route path="carousel" element={<AdminCarouselManagement />} />
        <Route path="charities/statistics" element={<CharitiesStatistics />} />
        <Route path="tickets" element={<AdminTickets />} />
        <Route path="products/statistics" element={<ProductsStatistics />} />

      </Route>
    </Routes>
  )
}

export default App
