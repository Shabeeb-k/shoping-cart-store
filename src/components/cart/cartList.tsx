import { useCartStore } from "../../store/cartStore";
import { CartItem } from "./CartItem";
import { Trash2 } from "lucide-react";
export const CartList = () => {
  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="text-5xl">🛒</div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Your cart is empty
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Add some products to your cart to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Cart Items</h2>

          <p className="mt-1 text-sm text-slate-500">
            {items.length} {items.length === 1 ? "product" : "products"} in your
            cart
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear cart</span>
        </button>
      </div>

      <div className="px-4 sm:px-6">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>
    </div>
  );
};
