import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

export const ProductGrid = ({
  products,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          No products found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}