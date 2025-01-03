// src/pages/admin/Users/List/ViewUserModal.tsx

import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from "@/types/user"
import { DialogDescription } from "@radix-ui/react-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getImageUrl } from '../../../../utils/env';

interface ViewUserModalProps {
  user: User
  onClose: () => void
}

export const ViewUserModal: React.FC<ViewUserModalProps> = ({ user, onClose }) => {
  const renderUserImage = (src: string | null, alt: string) => {
    return src ? (
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <img src={src} alt={alt} />
      </div>
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">No {alt} available</span>
      </div>
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">جزئیات کاربر</DialogTitle>
        </DialogHeader>
        <DialogDescription>اطلاعات کامل کاربر</DialogDescription>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold mb-2">تصویر پروفایل</h3>
                {renderUserImage(getImageUrl(user.avatar), "Avatar")}
              </div>
              <div>
                <h3 className="font-semibold mb-2">بنر</h3>
                {renderUserImage(getImageUrl(user.banner), "Banner")}
              </div>
              <div>
                <h3 className="font-semibold mb-2">تصویر KYC</h3>
                {renderUserImage(getImageUrl(user.kyc_picture), "KYC Picture")}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p><strong>نام:</strong> {user.first_name}</p>
                <p><strong>نام خانوادگی:</strong> {user.last_name}</p>
                <p><strong>کد ملی:</strong> {user.meli_code || 'ندارد'}</p>
                <p><strong>شماره تلفن:</strong> {user.phone}</p>
                <p><strong>نقش:</strong> {user.role === 'user' ? 'کاربر' : 'مدیر'}</p>
                <p><strong>وضعیت:</strong> {user.status === 1 ? 'فعال' : 'مسدود'}</p>
                <p><strong>وضعیت خیریه:</strong> {user.charity_status}</p>
                <p><strong>شبا:</strong> {user.sheba_code || 'ندارد'}</p>
                <p><strong>شماره کارت:</strong> {user.card_number || 'ندارد'}</p>
              </div>
              <div className="space-y-2">
                <p><strong>نام کاربری شبکه اجتماعی اول:</strong> {user.social_media_username_fisrt || 'ندارد'}</p>
                <p><strong>پلتفرم شبکه اجتماعی اول:</strong> {user.social_media_platform_first || 'ندارد'}</p>
                <p><strong>نام کاربری شبکه اجتماعی دوم:</strong> {user.social_media_username_second || 'ندارد'}</p>
                <p><strong>پلتفرم شبکه اجتماعی دوم:</strong> {user.social_media_platform_second || 'ندارد'}</p>
                <p><strong>نام کاربری:</strong> {user.username || 'ندارد'}</p>
                <p><strong>ایمیل:</strong> {user.email || 'ندارد'}</p>
                <p><strong>آدرس:</strong> {user.address || 'ندارد'}</p>
                <p><strong>موقعیت:</strong> {user.location || 'ندارد'}</p>
                <p><strong>نشان:</strong> {user.badge || 'ندارد'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">بیوگرافی:</h3>
              <p className="bg-gray-100 p-3 rounded-lg">{user.bio || 'ندارد'}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <p><strong>تاریخ ایجاد:</strong> {new Date(user.created_at).toLocaleString('fa-IR')}</p>
              <p><strong>تاریخ به‌روزرسانی:</strong> {new Date(user.updated_at).toLocaleString('fa-IR')}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}