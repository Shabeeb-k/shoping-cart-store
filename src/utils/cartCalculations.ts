import type {
  CartItem,
  CartTotals,
} from '../types/cart'

const TAX_RATE = 0.05
const DISCOUNT_RATE = 0.1
const DISCOUNT_THRESHOLD = 100
const MINIMUM_CHECKOUT_VALUE = 10

export const calculateSubtotal = (
  items: CartItem[],
): number => {
  return items.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0,
  )
}

export const calculateTax = (
  subtotal: number,
): number => {
  return subtotal * TAX_RATE
}

export const calculateDiscount = (
  subtotal: number,
): number => {
  if (subtotal > DISCOUNT_THRESHOLD) {
    return subtotal * DISCOUNT_RATE
  }

  return 0
}

export const calculateCartTotals = (
  items: CartItem[],
): CartTotals => {
  const subtotal =
    calculateSubtotal(items)

  const tax = calculateTax(subtotal)

  const discount =
    calculateDiscount(subtotal)

  const total =
    subtotal + tax - discount

  return {
    subtotal,
    tax,
    discount,
    total,
  }
}

export const isMinimumCheckoutValueReached = (
  subtotal: number,
): boolean => {
  return subtotal >= MINIMUM_CHECKOUT_VALUE
}

export const formatCurrency = (
  value: number,
): string => {
  return `$${value.toFixed(2)}`
}