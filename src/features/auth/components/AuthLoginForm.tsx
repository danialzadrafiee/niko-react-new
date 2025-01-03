// src/features/auth/components/AuthLoginForm.tsx

import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useLoginForm } from "@/features/auth/hooks/useLoginForm"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/features/auth/store/authStore"
import { AuthStage } from "@/types/auth"

const AuthLoginForm: React.FC = () => {
  const { initialValues, validationSchema, handleAuth } = useLoginForm()
  const { setAuthStage } = useAuthStore()

  const handleForgetPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setAuthStage(AuthStage.ForgetPassword)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAuth}>
      {({ values, handleChange, handleBlur, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <Field 
              name="phone" 
              type="tel" 
              placeholder="شماره تلفن" 
              className="w-full p-2 border rounded" 
              value={values.phone} 
              onChange={handleChange} 
              onBlur={handleBlur} 
              disabled 
            />
          </div>
          <div>
            <Field 
              name="password" 
              type="password" 
              placeholder="رمز عبور" 
              className="w-full p-2 border rounded" 
              value={values.password} 
              onChange={handleChange} 
              onBlur={handleBlur} 
            />
            <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          <div className="flex justify-between items-center">
            <a 
              href="#" 
              onClick={handleForgetPasswordClick} 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              فراموشی رمز عبور
            </a>
          </div>
          <Button type="submit" className="w-full" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthLoginForm