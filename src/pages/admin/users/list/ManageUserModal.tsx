import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User } from "@/types/user"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BasicInfoTab from "./BasicInfoTab"
import CharityInfoTab from "./CharityInfoTab"

interface ManageUserModalProps {
  user: User
  onClose: () => void
  onUpdate: (userData: Partial<User>) => void
}

export const ManageUserModal: React.FC<ManageUserModalProps> = ({ user, onClose, onUpdate }) => {
  const [userData, setUserData] = useState<Partial<User>>({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    meli_code: user.meli_code || "",
    phone: user.phone || "",
    role: user.role || "",
    status: user.status || "",
    username: user.username || "",
    email: user.email || "",
    charity_status: user.charity_status || "",
    charity_reject_reason: user.charity_reject_reason || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string | number) => {
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(userData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">مدیریت کاربر</DialogTitle>
          <DialogDescription>ویرایش و مشاهده اطلاعات کاربر</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[75vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="basic-info" dir="rtl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic-info">اطلاعات شخصی</TabsTrigger>
                <TabsTrigger value="charity-info">اطلاعات خیریه</TabsTrigger>
              </TabsList>

              <TabsContent value="basic-info">
                <BasicInfoTab user={user} userData={userData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />
              </TabsContent>

              <TabsContent value="charity-info">
                <CharityInfoTab user={user} userData={userData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />
              </TabsContent>
            </Tabs>

            <Button type="submit">به‌روزرسانی کاربر</Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}