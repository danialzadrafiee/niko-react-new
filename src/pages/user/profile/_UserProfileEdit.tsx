import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUser } from "@/features/user/hooks/useUser"
import { userUpdateSchema } from "@/features/user/schemas/userSchema"
import { User } from "@/types/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ImageUpload from "@/components/common/ImageUpload"
import useAuthStore from "@/features/auth/store/authStore"
import { getImageUrl } from "@/utils/env"
import { useNavigate } from "react-router-dom"
import { handleError, showSuccessToast } from "@/utils/errorHandler"
import UserTickets from "../tickets/_UserTickets"

const UserEditProfile: React.FC = () => {
  const { user, logout, fetchUser } = useAuthStore()
  const { updateUser } = useUser()
  const [showVerificationAlert, setShowVerificationAlert] = useState(false)
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const navigate = useNavigate()
  console.log(user)
  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  const form = useForm<User>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: user || {},
    mode: "onSubmit",
  })

  const {
    control,
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = form

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      const isCharity = user?.role === "charity"
      if (isCharity && ["card_number", "sheba_code", "meli_code", "address", "location", "kyc_picture"].includes(name as string)) {
        setShowVerificationAlert(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [user, watch])

  if (!user) return null

  const isCharity = user.role === "charity"

  const onSubmit = async () => {
    setShowUpdateConfirmation(true)
  }

  const confirmUpdate = async () => {
    if (!user) {
      console.error("اطلاعات کاربر در دسترس نیست")
      return
    }

    setIsUpdating(true)
    try {
      const validatedData = userUpdateSchema.parse(form.getValues())
      const formData = new FormData()

      Object.entries(validatedData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formData.append(key, value instanceof File ? value : String(value))
        }
      })

      if (isCharity && Object.keys(dirtyFields).some((field) => ["card_number", "sheba_code", "meli_code", "address", "location", "kyc_picture"].includes(field))) {
        formData.append("charity_status", "requested")
      }

      await updateUser(user.id, formData as any)
      setShowUpdateConfirmation(false)
    } catch (error) {
      console.error("خطا در به‌روزرسانی پروفایل کاربر:", error)
      handleError(error, "خطا در به‌روزرسانی پروفایل کاربر")
    } finally {
      setIsUpdating(false)
      showSuccessToast("کاربر با موفقیت به روز رسانی شد")
    }
  }

  const handleConvertToCharity = async () => {
    try {
      await updateUser(user.id, { charity_status: "not_requested", role: "charity" })
    } catch (error) {
      console.error("خطا در تبدیل اکانت به خیریه:", error)
    } finally {
      window.location.reload()
    }
  }

  const handleRequestReview = async () => {
    setIsUpdating(true)
    try {
      await updateUser(user.id, { charity_status: "requested" })
      showSuccessToast("درخواست بررسی اطلاعات با موفقیت ارسال شد")
      window.location.reload()
    } catch (error) {
      console.error("خطا در درخواست بررسی اطلاعات:", error)
      handleError(error, "خطا در درخواست بررسی اطلاعات")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLogout = async () => {
    logout()
    navigate("/")
  }

  return (
    <div className="max-w-6xl mx-auto">
      {renderAlerts()}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tickets">تیکت ها</TabsTrigger>
          <TabsTrigger value="profile">تنظیمات</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between w-full items-center">
                  <div className="grid gap-1">
                    <CardTitle>پروفایل کاربر</CardTitle>
                    <CardDescription>ویرایش اطلاعات شخصی</CardDescription>
                  </div>
                  <div>
                    <Button variant={"destructive"} onClick={handleLogout}>
                      خروج
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{isCharity ? renderCharityForm() : renderUserForm()}</CardContent>
            </Card>
            {renderFormActions()}
          </form>
          {renderUpdateConfirmationDialog()}
        </TabsContent>
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>تیکت ها</CardTitle>
              <CardDescription>مدیریت تیکت های شما</CardDescription>
            </CardHeader>
            <CardContent>
              <UserTickets />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  function renderAlerts() {
    if (!isCharity) return null

    return (
      <>
        {(() => {
          switch (user?.charity_status) {
            case "not_requested":
            case "none":
              return (
                <Alert variant="warning" className="mb-6">
                  <AlertTitle>تکمیل اطلاعات خیریه</AlertTitle>
                  <AlertDescription>
                    <div>لطفاً موارد زیر را تکمیل کنید: کد ملی، شماره شبا، شماره کارت، تصویر احراز هویت، موقعیت مکانی و ایمیل.</div>
                    <Button className="mt-4" onClick={handleRequestReview}>
                      درخواست بررسی اطلاعات
                    </Button>
                  </AlertDescription>
                </Alert>
              )
            case "actived":
              return (
                <Alert variant="success" className="mb-6">
                  <AlertTitle>وضعیت خیریه</AlertTitle>
                  <AlertDescription>اطلاعات شما فعال است</AlertDescription>
                </Alert>
              )
            case "requested":
              return (
                <Alert variant="warning" className="mb-6">
                  <AlertTitle>وضعیت خیریه</AlertTitle>
                  <AlertDescription>اطلاعات شما در دست بررسی است</AlertDescription>
                </Alert>
              )
            case "rejected":
              return (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>وضعیت خیریه</AlertTitle>
                  <AlertDescription>
                    <div>درخواست خیریه شما رد شده است. دلیل:</div>
                    <p className="font-semibold mt-2">{user.charity_reject_reason}</p>
                    <Button className="mt-2" onClick={handleRequestReview}>
                      درخواست مجدد
                    </Button>
                  </AlertDescription>
                </Alert>
              )
            default:
              return null
          }
        })()}

        {showVerificationAlert && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>توجه</AlertTitle>
            <AlertDescription>در صورت به‌روزرسانی اطلاعات احراز هویت، وضعیت پروفایل شما به حالت در انتظار بررسی تغییر خواهد کرد.</AlertDescription>
          </Alert>
        )}
      </>
    )
  }

  function renderCharityForm() {
    return (
      <Tabs dir="rtl" defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">اطلاعات شخصی</TabsTrigger>
          <TabsTrigger value="verification">احراز هویت</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">{renderPersonalInfo()}</TabsContent>
        <TabsContent value="verification">{renderVerificationInfo()}</TabsContent>
      </Tabs>
    )
  }

  function renderUserForm() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller name="first_name" control={control} render={({ field }) => <Input {...field} type="text" placeholder="نام" />} />
        <Controller name="last_name" control={control} render={({ field }) => <Input {...field} placeholder="نام خانوادگی" />} />
        <Controller name="username" control={control} render={({ field }) => <Input {...field} type="text" placeholder="نام کاربری" value={field.value ?? ""} />} />
        <Controller name="phone" control={control} render={({ field }) => <Input {...field} placeholder="تلفن" />} />
        <Controller name="email" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} type="email" placeholder="ایمیل" />} />
        <Controller name="bio" control={control} render={({ field }) => <Textarea {...field} value={field.value ?? ""} placeholder="بیوگرافی" />} />
        <Controller name="social_media_username_fisrt" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="نام کاربری شبکه اجتماعی (اول)" />} />
        <Controller name="social_media_platform_first" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="پلتفرم شبکه اجتماعی (اول)" />} />
        <Controller name="social_media_username_second" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="نام کاربری شبکه اجتماعی (دوم)" />} />
        <Controller name="social_media_platform_second" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="پلتفرم شبکه اجتماعی (دوم)" />} />
      </div>
    )
  }
  function renderPersonalInfo() {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller name="first_name" control={control} render={({ field }) => <Input {...field} placeholder="نام" />} />
          <Controller name="last_name" control={control} render={({ field }) => <Input {...field} placeholder="نام خانوادگی" />} />
          <Controller name="username" control={control} render={({ field }) => <Input {...field} type="text" value={field.value ?? ""} placeholder="نام کاربری" />} />
          <Controller name="phone" control={control} render={({ field }) => <Input {...field} type="text" placeholder="تلفن" />} />
          <Controller name="email" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} type="email" placeholder="ایمیل" />} />
          <Controller name="social_media_username_fisrt" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="نام کاربری شبکه اجتماعی (اول)" />} />
          <Controller name="social_media_platform_first" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="پلتفرم شبکه اجتماعی (اول)" />} />
          <Controller name="social_media_username_second" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="نام کاربری شبکه اجتماعی (دوم)" />} />
          <Controller name="social_media_platform_second" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="پلتفرم شبکه اجتماعی (دوم)" />} />
          <Controller name="bio" control={control} render={({ field }) => <Textarea {...field} value={field.value ?? ""} placeholder="بیوگرافی" />} />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller name="avatar" control={control} render={() => <ImageUpload name="avatar" form={form} label="آواتار" existingImageUrl={getImageUrl(user?.avatar)} />} />
          <Controller name="banner" control={control} render={() => <ImageUpload name="banner" form={form} label="بنر" existingImageUrl={getImageUrl(user?.banner)} />} />
        </div>
      </>
    )
  }

  function renderVerificationInfo() {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller name="card_number" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="شماره کارت" />} />
          <Controller name="sheba_code" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="کد شبا" />} />
          <Controller name="meli_code" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="کد ملی" />} />
          <Controller name="address" control={control} render={({ field }) => <Textarea {...field} value={field.value ?? ""} placeholder="آدرس" />} />
          <Controller name="location" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="موقعیت مکانی" />} />
          <Controller name="badge" control={control} render={({ field }) => <Input {...field} value={field.value ?? ""} placeholder="نشان" />} />
        </div>
        <div className="mt-6">
          <Controller name="kyc_picture" control={control} render={() => <ImageUpload name="kyc_picture" form={form} label="تصویر احراز هویت" existingImageUrl={getImageUrl(user?.kyc_picture)} />} />
        </div>
      </>
    )
  }

  function renderFormActions() {
    return (
      <div className="flex justify-between items-center">
        <Button type="submit" size="lg" disabled={isUpdating}>
          {isUpdating ? "در حال به‌روزرسانی..." : "به‌روزرسانی پروفایل"}
        </Button>

        {!isCharity && user?.role != "admin" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">تبدیل اکانت به خیریه</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>تبدیل اکانت به خیریه</DialogTitle>
                <DialogDescription>آیا مطمئن هستید که می‌خواهید اکانت خود را به خیریه تبدیل کنید؟</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={handleConvertToCharity}>بله، تبدیل کن</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  }

  function renderUpdateConfirmationDialog() {
    return (
      <Dialog open={showUpdateConfirmation} onOpenChange={setShowUpdateConfirmation}>
        <DialogContent>
          <DialogHeader className="*:text-right">
            <DialogTitle className="mt-5">تایید به‌روزرسانی</DialogTitle>
            <DialogDescription>آیا مطمئن هستید که می‌خواهید پروفایل خود را به‌روزرسانی کنید؟</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2  ml-auto ">
            <Button onClick={confirmUpdate} disabled={isUpdating}>
              {isUpdating ? "در حال به‌روزرسانی..." : "تایید"}
            </Button>
            <Button onClick={() => setShowUpdateConfirmation(false)} variant="outline" disabled={isUpdating}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
}

export default UserEditProfile
