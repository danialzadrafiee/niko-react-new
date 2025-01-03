import React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types/user"

interface SocialMediaTabProps {
  form: ReturnType<typeof useForm<User>>
}

const SocialMediaTab: React.FC<SocialMediaTabProps> = ({ form }) => {
  const { register } = form

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="social_media_username_fisrt">نام کاربری اولین رسانه اجتماعی</Label>
          <Input id="social_media_username_fisrt" {...register("social_media_username_fisrt")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="social_media_platform_first">پلتفرم اولین رسانه اجتماعی</Label>
          <Input id="social_media_platform_first" {...register("social_media_platform_first")} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="social_media_username_second">نام کاربری دومین رسانه اجتماعی</Label>
          <Input id="social_media_username_second" {...register("social_media_username_second")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="social_media_platform_second">پلتفرم دومین رسانه اجتماعی</Label>
          <Input id="social_media_platform_second" {...register("social_media_platform_second")} />
        </div>
      </div>
    </div>
  )
}

export default SocialMediaTab