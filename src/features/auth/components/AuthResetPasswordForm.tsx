// src/features/auth/components/AuthResetPasswordForm.tsx

import React, { useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useResetPasswordForm } from "../hooks/useResetPasswordForm"
import { Button } from "@/components/ui/button"

const AuthResetPasswordForm: React.FC = () => {
  const { initialValues, validationSchema, handleResetPassword, handleResendCode, timeLeft, resetPasswordPhone } = useResetPasswordForm()

  useEffect(() => {
    if (timeLeft === 0) {
      handleResendCode()
    }
  }, [handleResendCode, timeLeft])

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleResetPassword}>
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <Field 
              name="code" 
              type="text" 
              placeholder="کد تایید" 
              className="w-full p-2 border rounded" 
              value={values.code} 
              onChange={handleChange} 
              onBlur={handleBlur} 
            />
            <ErrorMessage name="code" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          <div>
            <Field 
              name="newPassword" 
              type="password" 
              placeholder="رمز عبور جدید" 
              className="w-full p-2 border rounded" 
              value={values.newPassword} 
              onChange={handleChange} 
              onBlur={handleBlur} 
            />
            <ErrorMessage name="newPassword" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          <Button type="submit" className="w-full" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "در حال بازنشانی..." : "بازنشانی رمز عبور"}
          </Button>
          {timeLeft > 0 ? (
            <div className="text-center text-gray-500">
              ارسال مجدد کد در {Math.ceil(timeLeft / 1000)} ثانیه دیگر
            </div>
          ) : (
            <Button 
              type="button" 
              onClick={handleResendCode} 
              className="w-full mt-2 p-2 text-gray-700 transition-colors bg-gray-300 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              ارسال مجدد کد به {resetPasswordPhone}
            </Button>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default AuthResetPasswordForm