import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required'),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required'),

  address: z
    .string()
    .trim()
    .min(1, 'Address is required'),

  city: z
    .string()
    .trim()
    .min(1, 'City is required'),

  postalCode: z
    .string()
    .trim()
    .min(1, 'Postal code is required'),
})

export type ShippingFormValues = z.infer<typeof shippingSchema>