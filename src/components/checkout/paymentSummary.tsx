import { useCartStore } from '../../store/cartStore'
import type { ShippingFormValues } from '../../schemas/shippingSchemas'
import {
  calculateCartTotals,
  formatCurrency,
} from '../../utils/cartCalculations'

interface PaymentSummaryProps {
  shippingData: ShippingFormValues
  onBack: () => void
  onPlaceOrder: () => void
}

export const PaymentSummary = ({
  shippingData,
  onBack,
  onPlaceOrder,
}: PaymentSummaryProps) => {
  const items = useCartStore(
    (state) => state.items,
  )

  const totals = calculateCartTotals(items)

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">
          Shipping details
        </h2>

        <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
          <p>
            <strong className="text-slate-900">
              Name:
            </strong>{' '}
            {shippingData.fullName}
          </p>

          <p>
            <strong className="text-slate-900">
              Email:
            </strong>{' '}
            {shippingData.email}
          </p>

          <p>
            <strong className="text-slate-900">
              Phone:
            </strong>{' '}
            {shippingData.phone}
          </p>

          <p>
            <strong className="text-slate-900">
              City:
            </strong>{' '}
            {shippingData.city}
          </p>

          <p className="md:col-span-2">
            <strong className="text-slate-900">
              Address:
            </strong>{' '}
            {shippingData.address}
          </p>

          <p>
            <strong className="text-slate-900">
              Postal code:
            </strong>{' '}
            {shippingData.postalCode}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">
          Order summary
        </h2>

        <div className="mt-4 divide-y divide-slate-200">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between gap-4 py-3"
            >
              <div>
                <p className="font-medium">
                  {item.product.title}
                </p>

                <p className="text-sm text-slate-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <span className="font-medium">
                {formatCurrency(
                  item.product.price *
                    item.quantity,
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">
          Payment summary
        </h2>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              {formatCurrency(totals.subtotal)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>

            <span>
              {formatCurrency(totals.tax)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>

            <span className="text-green-600">
              −{formatCurrency(totals.discount)}
            </span>
          </div>

          <div className="flex justify-between border-t border-slate-200 pt-3 text-xl font-bold">
            <span>Final total</span>

            <span>
              {formatCurrency(totals.total)}
            </span>
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onPlaceOrder}
          className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Place order
        </button>
      </div>
    </div>
  )
}