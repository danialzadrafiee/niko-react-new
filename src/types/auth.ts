import { User } from "./user"

export interface AuthResult {
  token: string
  user: User
}


export interface AuthResult {
  token: string
  user: User
}

export enum AuthStage {
  Phone = "phone",
  Login = "login",
  Signup = "signup",
  ResetPassword = "reset-password",
  ForgetPassword = "forget-password"
}

export interface AuthState {
  token: string | null
  user: User | null
  resendTime: number | null
  isExistingUser: boolean | null
  phone: string
  authStage: AuthStage
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  setResendTime: (time: number | null) => void
  handlePhoneSubmit: (values: { phone: string }) => Promise<void>
  handleAuth: (values: { phone: string; password: string; code?: string }) => Promise<void>
  handleResendCode: () => Promise<void>
  logout: () => void
  initializeAuth: () => void
  fetchUser: () => Promise<void>
  setAuthStage: (stage: AuthStage) => void
  resetPasswordPhone: string | null;
  setResetPasswordPhone: (phone: string) => void;
  handleForgetPassword: (phone: string) => Promise<void>;
  handleResetPassword: (code: string, newPassword: string) => Promise<void>;
}