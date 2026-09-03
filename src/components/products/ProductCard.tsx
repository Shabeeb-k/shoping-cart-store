import type { Product } from '../../types/product'
import { useCartStore } from '../../store/cartStore'
import { formatCurrency } from '../../utils/cartCalculations'
interface ProductCardProps {
  product: Product
}

export const ProductCard = ({
  product,
}: ProductCardProps) => {
  const addToCart = useCartStore(
    (state) => state.addToCart,
  )

  const cartItems = useCartStore(
    (state) => state.items,
  )

  const cartItem = cartItems.find(
    (item) => item.product.id === product.id,
  )

  const isMaxQuantityReached =
    cartItem?.quantity === 5

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          {product.category}
        </p>

        <h2 className="line-clamp-2 min-h-12 text-base font-semibold text-slate-900">
          {product.title}
        </h2>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            {formatCurrency(product.price)}
          </span>

          <span className="text-sm text-amber-600">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {product.stock > 0
            ? `${product.stock} available`
            : 'Out of stock'}
        </p>

        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={
            product.stock === 0 ||
            isMaxQuantityReached
          }
          className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:bg-slate-300"
        >
          {isMaxQuantityReached
            ? 'Maximum quantity reached'
            : product.stock === 0
              ? 'Out of stock'
              : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}