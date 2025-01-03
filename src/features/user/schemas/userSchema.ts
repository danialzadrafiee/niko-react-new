import { z } from 'zod';

export const userSchema = z.object({
  first_name: z.string().max(255, 'نام کوچک بسیار طولانی است').nullable().optional(),
  last_name: z.string().max(255, 'نام خانوادگی بسیار طولانی است').nullable().optional(),
  meli_code: z.string().nullable().optional(),
  phone: z.string().min(10, 'شماره تلفن بسیار کوتاه است').max(15, 'شماره تلفن بسیار طولانی است'),
  type: z.enum(['user', 'admin']).nullable().optional(),
  status: z.any().nullable().optional(),
  charity_status: z.string().nullable().optional(),
  sheba_code: z.string().nullable().optional(),
  card_number: z.string().nullable().optional(),
  social_media_username_fisrt: z.string().nullable().optional(),
  social_media_platform_first: z.string().nullable().optional(),
  social_media_username_second: z.string().nullable().optional(),
  social_media_platform_second: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  badge: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
});

export const userUpdateSchema = userSchema.extend({
  kyc_picture: z.any().nullable().optional(),
  avatar: z.any().nullable().optional(),
  banner: z.any().nullable().optional(),
});

export const changeTypeSchema = z.object({
  type: z.enum(['user', 'admin']).nullable().optional(),
});