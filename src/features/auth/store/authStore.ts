import { create } from "zustand"
import * as authService from "@/features/auth/services/authService"
import * as verificationService from "@/features/auth/services/verificationService"
import { handleError, showSuccessToast } from "@/utils/errorHandler"
import Cookies from "js-cookie"
import { AuthStage, AuthState } from "@/types/auth"

const getInitialResendTime = () => {
  const storedTime = localStorage.getItem("resendTime")
  if (storedTime) {
    const parsedTime = parseInt(storedTime, 10)
    if (parsedTime > Date.now()) {
      return parsedTime
    }
  }
  return null
}

const getPersistedUser = () => {
  const storedUser = localStorage.getItem("user")
  return storedUser ? JSON.parse(storedUser) : null
}

const useAuthStore = create<AuthState>((set, get) => ({
  token: Cookies.get("auth_token") || null,
  user: getPersistedUser(),
  resendTime: getInitialResendTime(),
  isExistingUser: null,
  phone: "",
  authStage: AuthStage.Phone,
  resetPasswordPhone: null,

  initializeAuth: async () => {
    const token = Cookies.get("auth_token")
    if (token) {
      set({ token })
      try {
        const user = await authService.fetchUser()
        get().setUser(user)
      } catch (error) {
        handleError(error, "Error fetching user data")
        get().logout()
      }
    }
  },

  setToken: (token) => {
    set({ token })
    if (token) {
      Cookies.set("auth_token", token, { expires: 7 })
    } else {
      Cookies.remove("auth_token")
    }
  },

  setUser: (user) => {
    set({ user })
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  },

  setResendTime: (time) => {
    if (time) {
      localStorage.setItem("resendTime", time.toString())
    } else {
      localStorage.removeItem("resendTime")
    }
    set({ resendTime: time })
  },

  setAuthStage: (stage: AuthStage) => {
    set({ authStage: stage })
  },

  setResetPasswordPhone: (phone: string) => {
    set({ resetPasswordPhone: phone })
  },

  handlePhoneSubmit: async (values) => {
    try {
      const exists = await authService.checkPhone(values.phone)
      set({
        isExistingUser: exists,
        phone: values.phone,
        authStage: exists ? AuthStage.Login : AuthStage.Signup,
      })
      if (!exists && !get().resendTime) {
        await get().handleResendCode()
      }
    } catch (error) {
      handleError(error, "Error checking phone number")
    }
  },

  handleAuth: async (values) => {
    try {
      let result
      if (get().isExistingUser) {
        result = await authService.login(values.phone, values.password)
      } else {
        result = await authService.signup(values.phone, values.code!, values.password)
      }
      get().setToken(result.token)
      get().setUser(result.user)
      showSuccessToast("با موفقیت واردشدید")
    } catch (error) {
      handleError(error, "خطای ورود")
    }
  },

  handleResendCode: async () => {
    try {
      await verificationService.sendVerificationCode(get().phone)
      showSuccessToast("کد ارسال شد")
      const newResendTime = Date.now() + 60000 // 1 minute from now
      get().setResendTime(newResendTime)
    } catch (error) {
      handleError(error, "خطای ارسال کد")
    }
  },

  handleForgetPassword: async (phone: string) => {
    const currentTime = Date.now()
    const existingResendTime = get().resendTime

    if (existingResendTime && existingResendTime > currentTime) {
      // If there's an active timer, transition to reset password form without sending a new SMS
      get().setResetPasswordPhone(phone)
      get().setAuthStage(AuthStage.ResetPassword)
      return
    }

    try {
      await authService.forgetPassword(phone)
      get().setResetPasswordPhone(phone)
      get().setAuthStage(AuthStage.ResetPassword)
      const newResendTime = Date.now() + 60000 // 1 minute from now
      get().setResendTime(newResendTime)
      showSuccessToast("کد بازیابی رمز عبور ارسال شد")
    } catch (error) {
      handleError(error, "خطا در ارسال کد بازیابی رمز عبور")
      throw error
    }
  },
  handleResetPassword: async (code: string, newPassword: string) => {
    try {
      await authService.resetPassword(get().resetPasswordPhone!, code, newPassword)
      get().setAuthStage(AuthStage.Login)
    } catch (error) {
      console.log("Error resetting password:", error)
      throw error
    }
  },

  logout: () => {
    set({
      token: null,
      user: null,
      isExistingUser: null,
      phone: "",
      authStage: AuthStage.Phone,
      resetPasswordPhone: null,
    })
    Cookies.remove("auth_token")
    localStorage.removeItem("user")
  },

  fetchUser: async () => {
    try {
      const user = await authService.fetchUser()
      get().setUser(user)
    } catch (error) {
      handleError(error, "کاربر پیدا نشد.")
      get().logout()
    }
  },
}))

export default useAuthStore
