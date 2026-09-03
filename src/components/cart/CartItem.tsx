import type { CartItem as CartItemType } from '../../types/cart'
import { useCartStore } from '../../store/cartStore'
import { formatCurrency } from '../../utils/cartCalculations'
import { Trash2 } from 'lucide-react'
interface CartItemProps {
  item: CartItemType
}

export const CartItem = ({
  item,
}: CartItemProps) => {
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  )

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  )

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart,
  )

  const itemTotal =
    item.product.price * item.quantity

  const isMinimumQuantity =
    item.quantity <= 1

  const isMaximumQuantity =
    item.quantity >= 5

  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 py-5 last:border-b-0 sm:flex-row sm:items-center">
      {/* Product image */}
      <img
        src={item.product.thumbnail}
        alt={item.product.title}
        className="h-20 w-20 rounded-lg object-cover"
      />

      {/* Product information */}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-900">
          {item.product.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {formatCurrency(item.product.price)} each
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center rounded-lg border border-slate-300 bg-white">
          <button
            type="button"
            onClick={() =>
              decreaseQuantity(item.product.id)
            }
            disabled={isMinimumQuantity}
            className="flex h-9 w-9 items-center justify-center text-lg font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
            aria-label={`Decrease quantity of ${item.product.title}`}
          >
            −
          </button>

          <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-300 px-2 text-sm font-semibold text-slate-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              increaseQuantity(item.product.id)
            }
            disabled={isMaximumQuantity}
            className="flex h-9 w-9 items-center justify-center text-lg font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
            aria-label={`Increase quantity of ${item.product.title}`}
          >
            +
          </button>
        </div>

        {/* Item total */}
        <div className="min-w-20 text-right">
          <p className="font-semibold text-slate-900">
            {formatCurrency(itemTotal)}
          </p>
        </div>

        {/* Remove */}
        <button
  type="button"
  onClick={() => removeFromCart(item.product.id)}
  className="rounded-md p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
  aria-label={`Remove ${item.product.title} from cart`}
  title="Remove from cart"
>
  <Trash2 className="h-4 w-4" />
</button>
      </div>
    </div>
  )
}