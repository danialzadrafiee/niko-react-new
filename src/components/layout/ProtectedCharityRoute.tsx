import useAuthStore from "@/features/auth/store/authStore"
import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const ProtectedCharityRoute = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate("/profile/edit")
  }

  if (user?.role == "charity" && user?.charity_status != "actived") {
    return (
      <div>
        <div className="flex items-center justify-center ">
          <div className="bg-yellow-500 p-4 rounded">
            <div className="flex items-center gap-2 justify-center">
              <div className="text-white text-sm">.اکانت شما هنوز تایید نشده است </div>
              <Button variant="outline" onClick={handleProfileClick} className="ml-2">
                مشاهده پروفایل
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (user?.role != "charity") {
    return (
      <div>
        <div className="flex items-center justify-center ">
          <div className="bg-red-500 p-4 rounded">
            <div className="flex items-center gap-2 justify-center">
              <div className="text-white text-sm">.شما اجازه دسترسی به این صفحه را ندارید </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <Outlet />
}

export default ProtectedCharityRoute
