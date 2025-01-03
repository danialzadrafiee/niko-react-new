import React from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ImageUpload from "@/components/common/ImageUpload"
import { User } from "@/types/user"
import { getImageUrl } from "@/utils/env"

interface FinancialInfoTabProps {
  form: ReturnType<typeof useForm<User>>
}

const FinancialInfoTab: React.FC<FinancialInfoTabProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sheba_code">کد شبا</Label>
        <Input id="sheba_code" {...register("sheba_code")} />
        {errors.sheba_code && <div className="text-red-500 text-sm">{errors.sheba_code.message}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="card_number">شماره کارت</Label>
        <Input id="card_number" {...register("card_number")} />
        {errors.card_number && <div className="text-red-500 text-sm">{errors.card_number.message}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="kyc_picture">تصویر احراز هویت</Label>
        <ImageUpload name="kyc_picture" existingImageUrl={getImageUrl(form.getValues("kyc_picture"))} form={form} label="آپلود تصویر احراز هویت" />
      </div>
    </div>
  )
}

export default FinancialInfoTab
