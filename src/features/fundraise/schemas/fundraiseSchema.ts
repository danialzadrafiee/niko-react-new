import { z } from "zod"

export const fundraiseValidationSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  amount: z.number().min(1, "مقدار باید بیشتر از ۰ باشد"),
  price_per_single_product: z.number().min(0, "قیمت هر محصول باید یک عدد مثبت باشد"),
  deadline: z.string().min(1, "مهلت الزامی است"),
  describe: z.string().min(1, "توضیحات الزامی است"),
  picture: z.instanceof(File).nullable(),
  product_id: z.string().min(1, "محصول الزامی است"),
})

export type FundraiseFormValues = z.infer<typeof fundraiseValidationSchema>

export const fundraiseInitialValues: FundraiseFormValues = {
  title: "",
  amount: 0,
  price_per_single_product: 0,
  deadline: "",
  describe: "",
  picture: null,
  product_id: "",
}