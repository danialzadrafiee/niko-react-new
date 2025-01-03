import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFundraiseUpdateForm from "@/features/fundraise/hooks/useFundraiseUpdateForm"
import FormField from "@/components/common/FormField"
import ImageUpload from "@/components/common/ImageUpload"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getImageUrl } from "@/utils/env"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AdminFundraiseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { form, handleUpdateSubmit, fetchFundraiseDetails, loading } = useFundraiseUpdateForm(Number(id))
  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false)

  useEffect(() => {
    if (id && !isInitialFetchDone) {
      fetchFundraiseDetails().then(() => setIsInitialFetchDone(true))
    }
  }, [id, fetchFundraiseDetails, isInitialFetchDone])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Update form submitted")
    console.log("Form values:", form.getValues())
    await handleUpdateSubmit(form.getValues())
  }

  if (loading && !isInitialFetchDone) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }
  console.log(form.getValues())
  return (
    <div className="">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-right">ویرایش صندوق</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField name="title" label="عنوان" required form={form} />
            <FormField name="describe" label="توضیحات" as="textarea" required form={form} className="h-[150px] resize-none" />
            <FormField name="deadline" label="مهلت" type="date" required form={form} />
            <ImageUpload name="picture" form={form} existingImageUrl={getImageUrl(form.getValues("picture") as string)} />

            {/* Add the status field */}
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">
                وضعیت
              </label>
              <Select onValueChange={(value) => form.setValue("status", value as any)} defaultValue={form.getValues("status")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="انتخاب وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empty">🔘 خالی</SelectItem> <SelectItem value="live">✅ فعال</SelectItem> <SelectItem value="dead">❌ غیرفعال</SelectItem> <SelectItem value="rejected">🚫 رد شده</SelectItem>{" "}
                  <SelectItem value="filled">✔️ تکمیل شده</SelectItem> <SelectItem value="withdraw_requested">🔄 درخواست برداشت</SelectItem> <SelectItem value="withdraw_done">💰 برداشت انجام شده</SelectItem>{" "}
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-6" />
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <span className="loading loading-spinner mr-2"></span>
                    در حال بروزرسانی...
                  </>
                ) : (
                  "بروزرسانی صندوق"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminFundraiseEdit
