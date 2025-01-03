import React from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User } from "@/types/user"
import { UserImage, InfoItem } from "./SharedComponents"

interface BasicInfoTabProps {
  user: User
  userData: Partial<User>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange: (name: string, value: string | number) => void
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ user, userData, handleInputChange, handleSelectChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>اطلاعات شخصی</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input name="first_name" value={userData.first_name} onChange={handleInputChange} placeholder="نام" />
          <Input name="last_name" value={userData.last_name} onChange={handleInputChange} placeholder="نام خانوادگی" />
          <Input name="meli_code" value={userData.meli_code || ""} onChange={handleInputChange} placeholder="کد ملی" />
          <Input name="phone" value={userData.phone} onChange={handleInputChange} placeholder="شماره تلفن" />
          <Input name="username" value={userData.username || ""} onChange={handleInputChange} placeholder="نام کاربری" />
          <Input name="email" value={userData.email || ""} onChange={handleInputChange} placeholder="ایمیل" />
          <Select name="role" value={userData.role} onValueChange={(value) => handleSelectChange("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب نقش" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">کاربر</SelectItem>
              <SelectItem value="charity">خیریه</SelectItem>
              <SelectItem value="admin">مدیر</SelectItem>
            </SelectContent>
          </Select>
          <Select name="status" value={userData.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="deactive">غیرفعال</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">تصویر پروفایل</h3>
            <UserImage src={user.avatar} alt="Avatar Picture" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">بنر</h3>
            <UserImage src={user.banner} alt="Banner Picture" />
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">شبکه‌های اجتماعی</h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="نام کاربری شبکه اجتماعی اول" value={user.social_media_username_fisrt} />
            <InfoItem label="پلتفرم شبکه اجتماعی اول" value={user.social_media_platform_first} />
            <InfoItem label="نام کاربری شبکه اجتماعی دوم" value={user.social_media_username_second} />
            <InfoItem label="پلتفرم شبکه اجتماعی دوم" value={user.social_media_platform_second} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicInfoTab