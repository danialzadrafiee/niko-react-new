// src/pages/admin/Product/Create/_AdminProductCreate.tsx

import React from "react"
import useProductForm from "@/features/product/hooks/useProductForm"
import CategorySelect from "./CategorySelect"
import FormField from "@/components/common/FormField"
import ImageUpload from "@/components/common/ImageUpload"

const AdminProductCreate: React.FC = () => {
  const { form, handleSubmit, loading } = useProductForm()

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )

  return (
    <div className="">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">ایجاد خدمت جدید</h1>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField name="title" label="عنوان" required form={form} />
                <FormField name="balance" label="موجودی"  type="number" required form={form} />
                <CategorySelect name="category_id" required form={form} />
              </div>
              <div className="space-y-4">
                <FormField name="location" label="موقعیت" required form={form} />
                <FormField name="price" label="قیمت" type="number" required form={form} />
              </div>
            </div>
            <div className="border-t border-gray-200 my-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="fundraise_max_price" label="حداکثر قیمت فروشنده" type="number" form={form} />
              <FormField name="fundraise_min_price" label="حداقل قیمت فروشنده" type="number" form={form} />
            </div>
            <div className="border-t border-gray-200 my-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="describe" label="توضیحات" as="textarea" required form={form} className="h-[350px] resize-none" />
              <ImageUpload name="picture" form={form} />
            </div>
            <div className="border-t border-gray-200 my-6"></div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 sm:mb-0">* فیلدهای ضروری</div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    در حال ایجاد...
                  </>
                ) : (
                  "ایجاد خدمت"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminProductCreate
