import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { fundraiseUpdateValidationSchema, FundraiseUpdateFormValues } from "@/features/fundraise/schemas/fundraiseUpdateSchema"
import { updateFundraise, fetchFundraise } from "../services/fundraiseService"
import { handleError } from "@/utils/errorHandler"
import { useState } from "react"

const useFundraiseUpdateForm = (id: number) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<FundraiseUpdateFormValues>({
    resolver: zodResolver(fundraiseUpdateValidationSchema),
    defaultValues: {
      title: "",
      describe: "",
      deadline: "",
      picture: undefined,
    },
  })

  const fetchFundraiseDetails = async () => {
    try {
      setLoading(true)
      const fundraiseData = await fetchFundraise(id)
      form.reset({
        title: fundraiseData.title,
        describe: fundraiseData.describe,
        deadline: fundraiseData.deadline.split("T")[0],
        picture: fundraiseData.picture,
        status: fundraiseData.status,
      })
    } catch (error) {
      handleError(error, "Failed to fetch fundraise details")
    } finally {
      setLoading(false)
    }
  }
  const handleUpdateSubmit = async (values: FundraiseUpdateFormValues) => {
    console.log("Form values before submission:", values)

    try {
      setLoading(true)
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (key === "picture") {
          if (value instanceof File) {
            formData.append(key, value)
          } else if (typeof value === "string" && value) {
            // If it's a string and not empty, it's an existing image URL
            formData.append(key, value)
          }
        } else if (value != null) {
          formData.append(key, value.toString())
        }
      })

      console.log("FormData entries:")
      for (const [key, value] of formData.entries()) {
        console.log(key, value)
      }

      await updateFundraise(id, formData)
    } catch (error) {
      console.error("Error updating fundraise:", error)
      handleError(error, "Failed to update fundraise")
    } finally {
      window.location.reload()
    }
  }

  return {
    form,
    handleUpdateSubmit,
    fetchFundraiseDetails,
    loading,
  }
}

export default useFundraiseUpdateForm
