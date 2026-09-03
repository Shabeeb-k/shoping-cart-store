import { useEffect, useState } from 'react'
import { Header } from './components/layout/Header'
import { ProductsPage } from './pages/ProductsPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import type { Product } from './types/product'

type Page =
  | 'products'
  | 'checkout'
  | 'product-details'

function App() {
  const [page, setPage] =
    useState<Page>('products')

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null)

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark',
  )

  // Apply and persist theme
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      darkMode,
    )

    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light',
    )
  }, [darkMode])

  const handleProductClick = (
    product: Product,
  ) => {
    setSelectedProduct(product)
    setPage('product-details')
  }

  const handleBackToProducts = () => {
    setSelectedProduct(null)
    setPage('products')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header
        onCartClick={() => setPage('checkout')}
        darkMode={darkMode}
        onToggleDarkMode={() =>
          setDarkMode((current) => !current)
        }
      />

      {page === 'products' ? (
        <ProductsPage
          onCheckout={() => setPage('checkout')}
          onProductClick={handleProductClick}
        />
      ) : page === 'checkout' ? (
        <CheckoutPage
          onBackToProducts={handleBackToProducts}
        />
      ) : selectedProduct ? (
        <ProductDetailsPage
          product={selectedProduct}
          onBack={handleBackToProducts}
        />
      ) : (
        <ProductsPage
          onCheckout={() => setPage('checkout')}
          onProductClick={handleProductClick}
        />
      )}

      <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Shopping Cart Application
        </div>
      </footer>
    </div>
  )
}

export default App