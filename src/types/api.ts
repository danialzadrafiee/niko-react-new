export interface ApiResponse<T> {
  status: "success" | "error"
  message: string | null
  payload: T
}

export interface ErrorResponse {
  status: "error"
  message: string
  errors?: Record<string, string[]>
}
