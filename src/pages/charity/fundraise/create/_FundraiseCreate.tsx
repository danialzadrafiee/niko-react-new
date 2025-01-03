import React from "react"
import useFundraiseForm from "@/features/fundraise/hooks/useFundraiseForm"
import FormField from "@/components/common/FormField"
import ImageUpload from "@/components/common/ImageUpload"
import ProductSelect from "./ProductSelect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const FundraiseCreate: React.FC = () => {
  const { form, handleSubmit, handleCategoryChange, handleProductChange, flattenedCategories, products, selectedCategory, selectedProduct, loading } = useFundraiseForm()

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )

  return (
    <div className="">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-right">ایجاد صندوق جدید</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField name="title" label="عنوان" required form={form} />
                <ProductSelect products={products} flattenedCategories={flattenedCategories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} onProductChange={handleProductChange} form={form} />
              </div>
              <div className="space-y-4">
                <FormField name="amount" label="مقدار" type="number" required form={form} />
                <FormField name="price_per_single_product" label="قیمت هر خدمت" type="number" required form={form} />
                {selectedProduct && (
                  <div className="text-sm text-right">
                    <div>حداقل قیمت: {selectedProduct.fundraise_min_price} تومان</div>
                    <div>حداکثر قیمت: {selectedProduct.fundraise_max_price} تومان</div>
                  </div>
                )}
                <FormField name="deadline" label="مهلت" type="date" required form={form} />
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="describe" label="توضیحات" as="textarea" required form={form} className="h-[350px] resize-none" />
              <ImageUpload name="picture" form={form} />
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 sm:mb-0">* فیلدهای ضروری</div>
              <div className="gap-4 flex items-center">
                <div>قیمت کل : </div>
                {form.watch("amount") && form.watch("price_per_single_product") && <span className="text-lg font-semibold ml-4">{(form.watch("amount") * form.watch("price_per_single_product")).toLocaleString()} تومان</span>}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <span className="loading loading-spinner mr-2"></span>
                      در حال ایجاد...
                    </>
                  ) : (
                    "ایجاد صندوق"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FundraiseCreate
