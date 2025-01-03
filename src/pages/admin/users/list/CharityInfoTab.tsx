import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock } from "lucide-react"
import { User } from "@/types/user"
import { CharityStatusBadge, UserImage, InfoItem } from "./SharedComponents"

interface CharityInfoTabProps {
  user: User
  userData: Partial<User>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSelectChange: (name: string, value: string | number) => void
}

const CharityInfoTab: React.FC<CharityInfoTabProps> = ({ user, userData, handleInputChange, handleSelectChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              وضعیت خیریه
              <CharityStatusBadge status={userData.charity_status ?? "none"} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select name="charity_status" value={userData.charity_status} onValueChange={(value) => handleSelectChange("charity_status", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="وضعیت خیریه" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">هیچکدام</SelectItem>
                <SelectItem value="not_requested">درخواست نشده</SelectItem>
                <SelectItem value="requested">درخواست شده</SelectItem>
                <SelectItem value="rejected">رد شده</SelectItem>
                <SelectItem value="actived">فعال شده</SelectItem>
              </SelectContent>
            </Select>
            {userData.charity_status === "rejected" && (
              <Textarea className="mt-4" name="charity_reject_reason" value={userData.charity_reject_reason || ""} onChange={handleInputChange} placeholder="دلیل رد درخواست خیریه" rows={4} />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>تصویر KYC</CardTitle>
          </CardHeader>
          <UserImage src={user.kyc_picture} alt="KYC Picture" />
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات مالی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="شبا" value={user.sheba_code} />
            <InfoItem label="شماره کارت" value={user.card_number} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات مکانی</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="آدرس" value={user.address} />
            <InfoItem label="موقعیت" value={user.location} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>سایر اطلاعات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <InfoItem label="نشان" value={user.badge} />
            <Separator />
            <div>
              <strong>بیوگرافی:</strong>
              <p className="bg-gray-100 p-3 rounded-lg mt-2">{user.bio || "ندارد"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تاریخچه</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="تاریخ ایجاد" value={new Date(user.created_at).toLocaleString("fa-IR")} icon={<Clock className="h-4 w-4 text-blue-500" />} />
            <InfoItem label="تاریخ به‌روزرسانی" value={new Date(user.updated_at).toLocaleString("fa-IR")} icon={<Clock className="h-4 w-4 text-green-500" />} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CharityInfoTab