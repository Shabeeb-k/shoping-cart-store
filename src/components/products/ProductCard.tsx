import type { Product } from '../../types/product'
import { useCartStore } from '../../store/cartStore'
import { formatCurrency } from '../../utils/cartCalculations'

interface ProductCardProps {
  product: Product
  onProductClick: () => void
}

export const ProductCard = ({
  product,
  onProductClick,
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

  const currentQuantity = cartItem?.quantity ?? 0

  const isMaxQuantityReached =
    currentQuantity >= 5

  return (
    <article
      onClick={onProductClick}
      className="
        flex cursor-pointer flex-col overflow-hidden
        rounded-xl border border-slate-200 bg-white
        shadow-sm transition
        hover:-translate-y-0.5 hover:shadow-md
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Product image */}
      <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Category */}
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {product.category}
        </p>

        {/* Title */}
        <h2 className="line-clamp-2 min-h-12 text-base font-semibold text-slate-900 dark:text-slate-100">
          {product.title}
        </h2>

        {/* Price + Rating */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {formatCurrency(product.price)}
          </span>

          <span className="text-sm text-amber-600 dark:text-amber-400">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Stock */}
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {product.stock > 0
            ? `${product.stock} available`
            : 'Out of stock'}
        </p>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            addToCart(product)
          }}
          disabled={
            product.stock === 0 ||
            isMaxQuantityReached
          }
          className="
            mt-4 w-full rounded-lg
            bg-slate-900 px-4 py-2.5
            text-sm font-semibold text-white
            transition hover:bg-slate-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300

            dark:bg-white
            dark:text-slate-900
            dark:hover:bg-slate-200
            dark:disabled:bg-slate-700
            dark:disabled:text-slate-400
          "
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