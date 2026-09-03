import { FilterX } from "lucide-react";

import { PriceRangeSlider } from "./PriceRangeSlider";
import type { SortOption } from "../../hooks/useProductFilters";

interface ProductFiltersProps {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  sortBy: SortOption;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onSortChange: (value: SortOption) => void;
  onClear: () => void;
}

export const ProductFilters = ({
  searchTerm,
  category,
  minPrice,
  maxPrice,
  priceRange,
  categories,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onClear,
}: ProductFiltersProps) => {
  return (
    <div
      className="
        mb-8 rounded-xl
        border border-slate-200
        bg-white p-4 shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          grid grid-cols-1 gap-4
          lg:grid-cols-[4fr_2fr_3fr_2fr_1fr]
        "
      >
        {/* Search */}
        <div className="min-w-0">
          <label
            htmlFor="search"
            className="
              mb-1 block text-sm font-medium
              text-slate-700
              dark:text-slate-200
            "
          >
            Search products
          </label>

          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by product title..."
            className="
              h-10 w-full rounded-lg
              border border-slate-300
              bg-white px-3
              text-sm text-slate-900
              outline-none transition

              placeholder:text-slate-400

              focus:border-slate-900
              focus:ring-1
              focus:ring-slate-900

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:placeholder:text-slate-500
              dark:focus:border-slate-400
              dark:focus:ring-slate-400
            "
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="category"
            className="
              mb-1 block text-sm font-medium
              text-slate-700
              dark:text-slate-200
            "
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="
              h-10 w-full rounded-lg
              border border-slate-300
              bg-white px-3
              text-sm text-slate-900
              outline-none transition

              focus:border-slate-900
              focus:ring-1
              focus:ring-slate-900

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:focus:border-slate-400
              dark:focus:ring-slate-400
            "
          >
            <option value="">All categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

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

        <div className="min-w-0">
          <label
            htmlFor="sort"
            className="
              mb-1 block text-sm font-medium
              text-slate-700
              dark:text-slate-200
            "
          >
            Sort by
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="
              h-10 w-full rounded-lg
              border border-slate-300
              bg-white px-3
              text-sm text-slate-900
              outline-none transition

              focus:border-slate-900
              focus:ring-1
              focus:ring-slate-900

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-100
              dark:focus:border-slate-400
              dark:focus:ring-slate-400
            "
          >
            <option value="default">Default</option>

            <option value="price-asc">Price: Low to High</option>

            <option value="price-desc">Price: High to Low</option>

            <option value="rating-desc">Rating: High to Low</option>

            <option value="name-asc">Name: A to Z</option>

            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* Clear */}
        {/* Clear */}
        <div className="min-w-0 pt-6">
          <button
            type="button"
            onClick={onClear}
            className="
      flex h-10 w-full
      items-center justify-center
      gap-2 rounded-lg
      border border-slate-300
      bg-white
      px-2
      text-sm font-medium
      text-slate-700
      transition
      hover:bg-slate-50
      dark:border-slate-700
      dark:bg-slate-900
      dark:text-slate-300
      dark:hover:bg-slate-800
    "
          >
            <FilterX className="h-5 w-5" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};
