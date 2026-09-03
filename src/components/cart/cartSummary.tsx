import { useCartStore } from '../../store/cartStore'
import {
  calculateCartTotals,
  formatCurrency,
  isMinimumCheckoutValueReached,
} from '../../utils/cartCalculations'

interface CartSummaryProps {
  onCheckout: () => void
}

export const CartSummary = ({
  onCheckout,
}: CartSummaryProps) => {
  const items = useCartStore(
    (state) => state.items,
  )

  const totals = calculateCartTotals(items)

  const minimumCheckoutValue = 10

  const canCheckout =
    items.length > 0 &&
    isMinimumCheckoutValueReached(
      totals.subtotal,
    )

  const remainingAmount = Math.max(
    minimumCheckoutValue - totals.subtotal,
    0,
  )

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">
        Price Summary
      </h2>

      <div className="mt-5 space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            Subtotal
          </span>

          <span className="font-medium text-slate-900">
            {formatCurrency(totals.subtotal)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            Tax (5%)
          </span>

          <span className="font-medium text-slate-900">
            {formatCurrency(totals.tax)}
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            Discount (10% above $100)
          </span>

          <span className="font-medium text-green-600">
            −{formatCurrency(totals.discount)}
          </span>
        </div>

        {/* Total */}
        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">
              Final total
            </span>

            <span className="text-xl font-bold text-slate-900">
              {formatCurrency(totals.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Minimum checkout message */}
      {!canCheckout && items.length > 0 && (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Minimum checkout value is $10
          </p>

          <p className="mt-1 text-sm text-amber-800">
            Add{' '}
            <strong>
              {formatCurrency(remainingAmount)}
            </strong>{' '}
            more to your cart to continue to
            checkout.
          </p>
        </div>
      )}

      {/* Checkout button */}
      <button
        type="button"
        disabled={!canCheckout}
        onClick={onCheckout}
        className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        {canCheckout
          ? 'Continue to shipping'
          : 'Checkout unavailable'}
      </button>
    </div>
  )
}