import { useCartStore } from "../../store/cartStore";
import { ShoppingCart } from "lucide-react";
interface HeaderProps {
  onCartClick: () => void;
}

export const Header = ({ onCartClick }: HeaderProps) => {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-bold text-slate-900"
        >
          ShopCart
        </button>

       <button
  type="button"
  onClick={onCartClick}
  className="relative flex h-12 w-12 items-center justify-center text-slate-900"
  aria-label={`Shopping cart with ${cartCount} item${
    cartCount !== 1 ? "s" : ""
  }`}
>
  <ShoppingCart className="h-8 w-8 stroke-[1.8]" />

  {cartCount > 0 && (
    <span className="absolute right-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
      {cartCount}
    </span>
  )}
</button>
      </div>
    </header>
  );
};
