import { toast } from "react-hot-toast"

interface ErrorResponse {
  response?: {
    data?: {
      message?: string
    }
  }
}

export const handleError = (error: unknown, defaultMessage: string = "An unexpected error occurred") => {
  console.error("Error:", error)

  if (error instanceof Error) {
    const errorResponse = error as ErrorResponse
    const errorMessage = errorResponse.response?.data?.message || error.message || defaultMessage
    toast.error(errorMessage)
  } else {
    toast.error(defaultMessage)
  }
}

export const showSuccessToast = (message: string) => {
  toast.success(message)
}