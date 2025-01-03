// src/features/auth/components/AuthForgetPassword.tsx

import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useForgetPasswordForm } from "../hooks/useForgetPasswordForm"
import { Button } from "@/components/ui/button"

const AuthForgetPassword: React.FC = () => {
  const { initialValues, validationSchema, handleForgetPassword } = useForgetPasswordForm()

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleForgetPassword}>
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
            />
            <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            variant="primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ارسال..." : "بازیابی رمز عبور"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthForgetPassword