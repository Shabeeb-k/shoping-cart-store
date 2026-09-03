import { useState } from 'react'
import { Header } from './components/layout/Header'
import { ProductsPage } from './pages/ProductsPage'
import { CheckoutPage } from './pages/CheckoutPage'

type Page = 'products' | 'checkout'

function App() {
  const [page, setPage] =
    useState<Page>('products')

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onCartClick={() => setPage('checkout')}
      />

      {page === 'products' ? (
        <ProductsPage
          onCheckout={() => setPage('checkout')}
        />
      ) : (
        <CheckoutPage
          onBackToProducts={() =>
            setPage('products')
          }
        />
      )}

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
          Shopping Cart Application
        </div>
      </footer>
    </div>
  )
}

export default App