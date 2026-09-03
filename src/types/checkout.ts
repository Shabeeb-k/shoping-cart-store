export interface ShippingFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export type CheckoutStep = 1 | 2 | 3