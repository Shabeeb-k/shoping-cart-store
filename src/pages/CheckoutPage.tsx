import { useState } from 'react'

import { CartReview } from '../components/checkout/cartReview'
import { CheckoutStepper } from '../components/checkout/checkoutStepper'
import { PaymentSummary } from '../components/checkout/paymentSummary'
import { ShippingForm } from '../components/checkout/shippingForm'

import type { ShippingFormValues } from '../schemas/shippingSchemas'
import type { CheckoutStep } from '../types/checkout'

import { useCartStore } from '../store/cartStore'

interface CheckoutPageProps {
  onBackToProducts: () => void
}

const initialShippingData: ShippingFormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

export const CheckoutPage = ({
  onBackToProducts,
}: CheckoutPageProps) => {
  const [step, setStep] =
    useState<CheckoutStep>(1)

  const [shippingData, setShippingData] =
    useState<ShippingFormValues>(
      initialShippingData,
    )

  const [orderPlaced, setOrderPlaced] =
    useState(false)

  const items = useCartStore(
    (state) => state.items,
  )

  const clearCart = useCartStore(
    (state) => state.clearCart,
  )

  /*
   * --------------------------------------------------
   * ORDER SUCCESS
   * --------------------------------------------------
   */

  if (orderPlaced) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-12">
        <div className="w-full rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
            ✓
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Order placed successfully!
          </h1>

          <p className="mt-3 text-slate-500">
            Thank you for your purchase. Your order
            has been successfully placed.
          </p>

          <button
            type="button"
            onClick={onBackToProducts}
            className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Continue shopping
          </button>
        </div>
      </main>
    )
  }

  /*
   * --------------------------------------------------
   * EMPTY CART
   * --------------------------------------------------
   */

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-12">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🛒</div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-slate-500">
            Add products before proceeding to
            checkout.
          </p>

          <button
            type="button"
            onClick={onBackToProducts}
            className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Browse products
          </button>
        </div>
      </main>
    )
  }

  /*
   * --------------------------------------------------
   * PLACE ORDER
   * --------------------------------------------------
   */

  const handlePlaceOrder = () => {
    clearCart()
    setOrderPlaced(true)
  }

  /*
   * --------------------------------------------------
   * CHECKOUT
   * --------------------------------------------------
   */

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onBackToProducts}
          className="text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Continue shopping
        </button>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Checkout
        </h1>
      </div>

      {/* Step indicator */}
      <CheckoutStepper currentStep={step} />

      {/* --------------------------------------------- */}
      {/* STEP 1 - CART REVIEW                          */}
      {/* --------------------------------------------- */}

      {step === 1 && (
        <CartReview
          onNext={() => {
            setStep(2)
          }}
        />
      )}

      {/* --------------------------------------------- */}
      {/* STEP 2 - SHIPPING                             */}
      {/* --------------------------------------------- */}

      {step === 2 && (
        <ShippingForm
          initialValues={shippingData}
          onBack={() => {
            setStep(1)
          }}
          onSubmit={(data) => {
            setShippingData(data)
            setStep(3)
          }}
        />
      )}

      {/* --------------------------------------------- */}
      {/* STEP 3 - PAYMENT SUMMARY                     */}
      {/* --------------------------------------------- */}

      {step === 3 && (
        <PaymentSummary
          shippingData={shippingData}
          onBack={() => {
            setStep(2)
          }}
          onPlaceOrder={handlePlaceOrder}
        />
      )}
    </main>
  )
}