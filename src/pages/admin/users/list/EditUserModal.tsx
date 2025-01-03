// src/pages/admin/Users/List/EditUserModal.tsx

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "@/types/user"

interface EditUserModalProps {
  user: User
  onClose: () => void
  onUpdate: (userData: Partial<User>) => void
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onUpdate }) => {
  const [userData, setUserData] = useState<Partial<User>>({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    meli_code: user.meli_code || "",
    phone: user.phone || "",
    role: user.role || "",
    status: user.status || "",
    username: user.username || "",
    email: user.email || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(userData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش کاربر</DialogTitle>
          <DialogDescription>لطفاً اطلاعات کاربر را وارد کنید</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="first_name" value={userData.first_name || ""} onChange={handleInputChange} placeholder="نام" />
          <Input name="last_name" value={userData.last_name || ""} onChange={handleInputChange} placeholder="نام خانوادگی" />
          <Input name="meli_code" value={userData.meli_code || ""} onChange={handleInputChange} placeholder="کد ملی" />
          <Input name="phone" value={userData.phone || ""} onChange={handleInputChange} placeholder="شماره تلفن" />
          <Select name="role" value={userData.role} onValueChange={(value) => handleSelectChange("role", value)}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب نقش" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">کاربر</SelectItem>
              <SelectItem value="admin">مدیر</SelectItem>
              <SelectItem value="charity">خیریه</SelectItem>
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
          <Input name="username" value={userData.username || "" } onChange={handleInputChange} placeholder="نام کاربری" />
          <Input name="email" value={userData.email || "" } onChange={handleInputChange} placeholder="ایمیل" />
          <Button type="submit">به‌روزرسانی کاربر</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
