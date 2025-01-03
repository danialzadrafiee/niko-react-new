import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useSignupForm } from "@/features/auth/hooks/useSignupForm"
import { Button } from "@/components/ui/button"

const AuthSignupForm: React.FC = () => {
  const { initialValues, validationSchema, handleAuth, handleResendCode, timeLeft } = useSignupForm()

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAuth}>
      {({ values, handleChange, handleBlur }) => (
        <Form className="space-y-4">
          <div>
            <Field name="phone" type="tel" placeholder="شماره تلفن" className="w-full p-2 border rounded" value={values.phone} onChange={handleChange} onBlur={handleBlur} disabled />
          </div>
          <div>
            <Field name="password" type="password" placeholder="رمز عبور" className="w-full p-2 border rounded" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          <div>
            <Field name="code" type="text" placeholder="کد تایید" className="w-full p-2 border rounded" value={values.code} onChange={handleChange} onBlur={handleBlur} />
            <ErrorMessage name="code" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          {timeLeft === 0 ? (
            <button type="button" onClick={handleResendCode} className="w-full p-2 text-gray-700 transition-colors bg-gray-300 rounded hover:bg-gray-400">
              ارسال مجدد کد
            </button>
          ) : (
            <div className="text-center text-gray-500">ارسال مجدد در {Math.ceil(timeLeft / 1000)} ثانیه دیگر</div>
          )}
          <Button type="submit" variant="primary">
            ثبت نام
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthSignupForm