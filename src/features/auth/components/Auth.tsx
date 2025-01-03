// src/features/auth/components/Auth.tsx

import React from "react"
import useAuthStore from "@/features/auth/store/authStore"
import AuthPhoneForm from "./AuthPhoneForm"
import AuthLoginForm from "./AuthLoginForm"
import AuthSignupForm from "./AuthSignupForm"
import AuthForgetPassword from "./AuthForgetPassword"
import AuthResetPasswordForm from "./AuthResetPasswordForm"

const Auth: React.FC = () => {
  const { isExistingUser, authStage, token } = useAuthStore()

  if (token) {
    return null
  }

  const renderForm = () => {
    switch (authStage) {
      case "phone":
        return <AuthPhoneForm />
      case "login":
        return <AuthLoginForm />
      case "signup":
        return <AuthSignupForm />
      case "forget-password":
        return <AuthForgetPassword />
      case "reset-password":
        return <AuthResetPasswordForm />
      default:
        return null
    }
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow-md">
      <h2 className="mb-6 text-xl font-bold text-center">
        {authStage === "phone" ? "شماره تلفن خود را وارد کنید" : authStage === "forget-password" ? "بازیابی رمز عبور" : authStage === "reset-password" ? "بازنشانی رمز عبور" : isExistingUser ? "ورود" : "ثبت نام"}
      </h2>
      {renderForm()}
    </div>
  )
}

export default Auth
