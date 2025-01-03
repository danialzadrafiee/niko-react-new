import { useState } from "react"
import * as Yup from "yup"
import useAuthStore from "../store/authStore"
export const useLoginForm = () => {
  const { phone, handleAuth } = useAuthStore()
  const [initialValues] = useState({ phone, password: "123456" })

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  })

  return { initialValues, validationSchema, handleAuth }
}
