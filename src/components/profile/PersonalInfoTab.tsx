import React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import ImageUpload from "@/components/common/ImageUpload"
import { User } from "@/types/user"
import { getImageUrl } from "@/utils/env"

interface PersonalInfoTabProps {
  form: ReturnType<typeof useForm<User>>
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">نام</Label>
          <Input id="first_name" {...register("first_name")} />
          {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name.message}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">نام خانوادگی</Label>
          <Input id="last_name" {...register("last_name")} />
          {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name.message}</div>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">ایمیل</Label>
          <Input id="email" {...register("email")} type="email" />
          {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">تلفن</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && <div className="text-red-500 text-sm">{errors.phone.message}</div>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">بیوگرافی</Label>
        <Textarea id="bio" {...register("bio")} />
        {errors.bio && <div className="text-red-500 text-sm">{errors.bio.message}</div>}
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="space-y-2 col-span-3">
          <Label htmlFor="banner">بنر</Label>
          <ImageUpload name="banner" form={form} label="آپلود بنر جدید" existingImageUrl={getImageUrl(form.getValues("banner"))} />
        </div>
        <div className="space-y-2 col-span-2">
          <Label htmlFor="avatar">آواتار</Label>
          <ImageUpload name="avatar" form={form} label="آپلود آواتار جدید" existingImageUrl={getImageUrl(form.getValues("avatar"))} />
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoTab
