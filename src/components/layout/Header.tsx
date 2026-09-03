import { useCartStore } from "../../store/cartStore";
import { Moon, ShoppingCart, Sun } from "lucide-react";

interface HeaderProps {
  onCartClick: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header = ({
  onCartClick,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) => {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          ShopCart
        </button>

        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={onCartClick}
            className="relative flex h-12 w-12 items-center justify-center text-slate-900 dark:text-white"
            aria-label={`Shopping cart with ${cartCount} item${
              cartCount !== 1 ? "s" : ""
            }`}
          >
            <ShoppingCart className="h-8 w-8 stroke-[1.8]" />

            {cartCount > 0 && (
              <span className="absolute right-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};