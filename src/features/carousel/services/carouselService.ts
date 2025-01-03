import { ApiResponse } from "@/types/api"
import axiosInstance from "@/utils/axiosInstance"
import { CarouselItem } from "@/types/home"

export const fetchCarouselItems = async (): Promise<CarouselItem[]> => {
  const response = await axiosInstance.get<ApiResponse<CarouselItem[]>>("/carousel")
  return response.data.payload
}

export const fetchCarouselItem = async (id: number): Promise<CarouselItem> => {
  const response = await axiosInstance.get<ApiResponse<CarouselItem>>(`/carousel/${id}`)
  return response.data.payload
}

export const createCarouselItem = async (data: Partial<CarouselItem>): Promise<CarouselItem> => {
  const formData = new FormData()
  if (data.image instanceof File) {
    formData.append("image", data.image)
  }
  formData.append("route_link", data.route_link || "")
  formData.append("order", data.order?.toString() || "0")

  const response = await axiosInstance.post<ApiResponse<CarouselItem>>("/carousel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.payload
}

export const updateCarouselItem = async (id: number, data: Partial<CarouselItem>): Promise<CarouselItem> => {
  const formData = new FormData()
  if (data.image instanceof File) {
    formData.append("image", data.image)
  }
  if (data.route_link !== undefined) formData.append("route_link", data.route_link)
  if (data.order !== undefined) formData.append("order", data.order.toString())

  const response = await axiosInstance.post<ApiResponse<CarouselItem>>(`/carousel/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.payload
}

export const deleteCarouselItem = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/carousel/${id}`)
}
