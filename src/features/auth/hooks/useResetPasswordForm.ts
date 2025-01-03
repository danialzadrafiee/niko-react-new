// src/features/auth/hooks/useResetPasswordForm.ts

import { useState, useEffect, useCallback } from "react"
import { object, string } from "yup"
import useAuthStore from "@/features/auth/store/authStore"
import { AuthStage } from "@/types/auth"
import { handleError, showSuccessToast } from "@/utils/errorHandler"

const TIMER_KEY = 'resetPasswordTimer'

export const useResetPasswordForm = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem(TIMER_KEY)
    if (storedTime) {
      const expirationTime = parseInt(storedTime, 10)
      const now = Date.now()
      const remainingTime = Math.max(0, expirationTime - now)
      return remainingTime
    }
    return 0
  })

  const { 
    resetPasswordPhone, 
    setAuthStage, 
    handleResetPassword: storeHandleResetPassword, 
    handleForgetPassword: storeHandleForgetPassword,
    resendTime,
    setResendTime
  } = useAuthStore()

  const initialValues = {
    code: "",
    newPassword: "",
  }

  const validationSchema = object().shape({
    code: string().required("کد تایید الزامی است").length(6, "کد تایید باید 6 رقمی باشد"),
    newPassword: string().required("رمز عبور جدید الزامی است").min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
  })

  useEffect(() => {
    if (resendTime) {
      const interval = setInterval(() => {
        const newTimeLeft = Math.max(0, resendTime - Date.now())
        setTimeLeft(newTimeLeft)
        if (newTimeLeft === 0) {
          clearInterval(interval)
          setResendTime(null)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [resendTime, setResendTime])

  const handleResetPassword = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      await storeHandleResetPassword(values.code, values.newPassword)
      showSuccessToast("رمز عبور با موفقیت تغییر کرد")
      setAuthStage(AuthStage.Login)
      localStorage.removeItem(TIMER_KEY)
      setResendTime(null)
    } catch (error) {
      handleError(error, "خطا در بازنشانی رمز عبور")
    } finally {
      setSubmitting(false)
    }
  }

  const handleResendCode = useCallback(async () => {
    if (!resendTime && resetPasswordPhone) {
      try {
        await storeHandleForgetPassword(resetPasswordPhone)
        showSuccessToast("کد تایید مجدداً ارسال شد")
        const newResendTime = Date.now() + 60000 // 1 minute from now
        setResendTime(newResendTime)
      } catch (error) {
        handleError(error, "خطا در ارسال مجدد کد تایید")
      }
    }
  }, [resendTime, resetPasswordPhone, storeHandleForgetPassword, setResendTime])

  return {
    initialValues,
    validationSchema,
    handleResetPassword,
    handleResendCode,
    resetPasswordPhone,
    timeLeft,
  }
}