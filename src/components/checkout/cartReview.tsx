import { CartList } from '../cart/cartList'
import { CartSummary } from '../cart/cartSummary'

interface CartReviewProps {
  onNext: () => void
}

export const CartReview = ({
  onNext,
}: CartReviewProps) => {
  return (
    <div className="space-y-6">
      {/* Cart items */}
      <CartList />

      {/* Price summary */}
      <CartSummary onCheckout={onNext} />
    </div>
  )
}