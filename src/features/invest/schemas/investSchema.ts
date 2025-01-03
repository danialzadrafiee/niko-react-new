// src/features/invest/schemas/investSchema.ts
import * as Yup from 'yup';

export const investValidationSchema = Yup.object().shape({
  amount: Yup.number().required('مقدار الزامی است').min(1, 'مقدار باید مثبت باشد'),
  anonymous: Yup.boolean().required('فیلد ناشناس الزامی است'),
});

export const investInitialValues = {
  amount: 0,
  anonymous: false,
};