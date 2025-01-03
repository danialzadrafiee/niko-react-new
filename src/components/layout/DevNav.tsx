import { Link } from "react-router-dom"

export default function DevNav() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex flex-wrap gap-2">
        <Link to="/" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Home
        </Link>
        <Link to="/auth" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Auth
        </Link>
        <Link to="/categories" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Categories
        </Link>
        <Link to="/user/profile/edit" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          User Profile Edit
        </Link>
        <Link to="/fundraises/list" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Fundraises List
        </Link>
        <Link to="/fundraises/list/1" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Fundraises by Category
        </Link>
        <Link to="/fundraises/show/1" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Fundraise Show
        </Link>
        <Link to="/products/list" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Products List
        </Link>
        <Link to="/products/list/1" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Products by Category
        </Link>
        <Link to="/products/show/1" className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          Product Show
        </Link>
        <Link to="/admin/products/create" className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">
          Admin: Create Product
        </Link>
        <Link to="/admin/categories" className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">
          Admin: Categories
        </Link>
        <Link to="/admin/users/list" className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">
          Admin: Users List
        </Link>
        <Link to="/admin/carousel/management" className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">
          Admin: Carousel Management
        </Link>
        <Link to="/admin/fundraise/create" className="px-2 py-1 bg-green-600 rounded hover:bg-yellow-700">
          Admin: Create Fundraise
        </Link>
        <Link to="/charity/fundraise/list" className="px-2 py-1 bg-yellow-600 rounded hover:bg-yellow-700">
          Charity: Fundraise List
        </Link>
        <Link to="/charity/fundraise/1" className="px-2 py-1 bg-yellow-600 rounded hover:bg-yellow-700">
          Charity: Fundraise Show
        </Link>
      </div>
    </nav>
  )
}
