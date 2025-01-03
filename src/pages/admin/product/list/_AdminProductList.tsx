import { ProductsDataTable } from "./ProductsDataTable"

const AdminProductList: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">لیست خدمات</h1>
      <ProductsDataTable />
    </div>
  )
}

export default AdminProductList
