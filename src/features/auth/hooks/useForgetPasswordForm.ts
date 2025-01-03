// src/features/auth/hooks/useForgetPasswordForm.ts

import { object, string } from "yup"
import useAuthStore from "@/features/auth/store/authStore"
import { handleError } from "@/utils/errorHandler"

export const useForgetPasswordForm = () => {
  const { handleForgetPassword: storeHandleForgetPassword } = useAuthStore()

  const initialValues = {
    phone: "",
  }

  const validationSchema = object().shape({
    phone: string()
      .required("شماره تلفن الزامی است")
      .matches(/^[0-9]{11}$/, "شماره تلفن باید 11 رقمی باشد"),
  })

  const handleForgetPassword = async (values: typeof initialValues, { setSubmitting }: any) => {
    try {
      await storeHandleForgetPassword(values.phone)
    } catch (error) {
      handleError(error, "خطا در ارسال کد بازیابی رمز عبور")
    } finally {
      setSubmitting(false)
    }
  }

  return {
    initialValues,
    validationSchema,
    handleForgetPassword,
  }
}
