import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { Header } from './components/layout/Header'
import { ProductsPage } from './pages/ProductsPage'
import { CheckoutPage } from './pages/CheckoutPage'

function AppContent() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onCartClick={() => navigate('/cart')}
      />

      <Routes>
        <Route
          path="/"
          element={<ProductsPage onCheckout={() => navigate('/cart')} />}
        />
        <Route
          path="/cart"
          element={<CheckoutPage onBackToProducts={() => navigate('/')} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
          Shopping Cart Application
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App