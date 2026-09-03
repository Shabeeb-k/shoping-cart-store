import { ProductFilters } from "../components/products/ProductFilters";
import { ProductGrid } from "../components/products/productGrid";
import { useProductFilters } from "../hooks/useProductFilters";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
interface ProductsPageProps {
  onCheckout: () => void;
  onProductClick: (product: Product) => void;
}

export const ProductsPage = ({
  onProductClick,
}: ProductsPageProps) => {
  const { data, isLoading, isError, error, refetch } = useProducts();

  const products = data?.products ?? [];

  const {
    searchTerm,
    sortBy,
    setSortBy,
    category,
    minPrice,
    maxPrice,
    priceRange,
    filteredProducts,
    categories,
    setSearchTerm,
    setCategory,
    setMinPrice,
    setMaxPrice,
    clearFilters,
  } = useProductFilters(products);

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="mt-4 font-medium text-slate-700">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-bold text-red-800">
            Unable to load products
          </h2>

          <p className="mt-2 text-sm text-red-700">
            {error instanceof Error
              ? error.message
              : "Something went wrong while fetching products."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-xl font-bold">No products available</h2>

        <p className="mt-2 text-slate-500">
          The API did not return any products.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Online store
          </p>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Discover products
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Browse our collection and find something you love.
          </p>
        </div>
        {/* 
        <button
          type="button"
          onClick={onCheckout}
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-white"
        >
          View cart
        </button> */}
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
        priceRange={priceRange}
        categories={categories}
        sortBy={sortBy}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategory}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onSortChange={setSortBy}
        onClear={clearFilters}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>
      </div>

      <ProductGrid
        products={filteredProducts}
        onProductClick={onProductClick}
      />
    </main>
  );
};
