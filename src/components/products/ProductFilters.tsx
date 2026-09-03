import { PriceRangeSlider } from './PriceRangeSlider'
import { FilterX } from 'lucide-react'
interface ProductFiltersProps {
  searchTerm: string
  category: string
  minPrice: number
  maxPrice: number
  priceRange: {
    min: number
    max: number
  }
  categories: string[]

  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onMinPriceChange: (value: number) => void
  onMaxPriceChange: (value: number) => void
  onClear: () => void
}

export const ProductFilters = ({
  searchTerm,
  category,
  minPrice,
  maxPrice,
  priceRange,
  categories,
  onSearchChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}: ProductFiltersProps) => {
  return (
    <div className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-[4fr_2fr_3fr_1fr]">

        {/* Search - 40% */}
        <div className="min-w-0">
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Search products
          </label>

          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search by product title..."
            className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Category - 20% */}
        <div className="min-w-0">
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
            className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          >
            <option value="">
              All categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Price - 30% */}
        <div className="min-w-0">
          <PriceRangeSlider
            min={priceRange.min}
            max={priceRange.max}
            minValue={minPrice}
            maxValue={maxPrice}
            onMinChange={onMinPriceChange}
            onMaxChange={onMaxPriceChange}
          />
        </div>

        {/* Clear Filters - 10% */}
        <div className="min-w-0">
  <button
    type="button"
    onClick={onClear}
    className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
  >
    <FilterX className="h-6 w-6" />
    <span >Clear</span>
  </button>
</div>

      </div>
    </div>
  )
}