import { z } from "zod"

export const fundraiseUpdateValidationSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  describe: z.string().min(1, "توضیحات الزامی است"),
  deadline: z.string().min(1, "تاریخ پایان الزامی است"),
  picture: z.union([z.instanceof(File), z.string()]).optional(),
  status: z.enum(['empty', 'live', 'dead', 'rejected', 'filled', 'withdraw_requested', 'withdraw_done']).optional(),
})

export type FundraiseUpdateFormValues = z.infer<typeof fundraiseUpdateValidationSchema>