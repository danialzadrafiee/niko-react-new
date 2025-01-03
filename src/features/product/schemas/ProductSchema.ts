// src/features/product/schemas/ProductSchema.ts

import { z } from 'zod';

export const productValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  balance: z.number().min(0, 'Balance must be a positive number'),
  price: z.number().min(0, 'Price must be a positive number'),
  fundraise_min_price: z.number().min(0, 'Seller min price must be a positive number').nullable(),
  fundraise_max_price: z.number().min(0, 'Seller max price must be a positive number').nullable(),
  describe: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  picture: z.union([z.instanceof(File), z.string()]).nullable(),
  category_id: z.union([z.string(), z.number()]),
});

export type ProductFormValues = z.infer<typeof productValidationSchema>;

export const productInitialValues: ProductFormValues = {
  title: '',
  balance: 0,
  price: 0,
  fundraise_min_price: null,
  fundraise_max_price: null,
  describe: '',
  location: '',
  picture: null,
  category_id: '',
};