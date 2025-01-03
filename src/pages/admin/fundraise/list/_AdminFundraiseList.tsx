// src/pages/admin/fundraise/list/_AdminFundraiseList.tsx

import React from "react"
import { FundraisesDataTable } from "./FundraisesDataTable"

const AdminFundraiseList: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">لیست صندوق‌های مشارکتی</h1>
      <FundraisesDataTable />
    </div>
  )
}

export default AdminFundraiseList