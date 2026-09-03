import { ArrowLeft, ShoppingCart, Star } from "lucide-react";

import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailsPage = ({
  product,
  onBack,
}: ProductDetailsPageProps) => {
  const addToCart = useCartStore(
    (state) => state.addToCart,
  );

  const cartItem = useCartStore((state) =>
    state.items.find(
      (item) => item.product.id === product.id,
    ),
  );

  const quantity = cartItem?.quantity ?? 0;

  const MAX_CART_QUANTITY = 5;

  const isMaxQuantityReached =
    quantity >= MAX_CART_QUANTITY;

  const handleAddToCart = () => {
    if (isMaxQuantityReached) {
      return;
    }

    addToCart(product);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="
          mb-6 flex items-center gap-2
          text-sm font-medium
          text-slate-600 transition
          hover:text-slate-900
          dark:text-slate-400
          dark:hover:text-white
        "
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </button>

      <div
        className="
          overflow-hidden rounded-2xl
          border border-slate-200
          bg-white shadow-sm
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
          <div
            className="
              flex min-h-[400px]
              items-center justify-center
              rounded-xl
              bg-slate-50 p-8
              dark:bg-slate-800
            "
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[450px] w-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span
              className="
                mb-3 w-fit rounded-full
                bg-slate-100 px-3 py-1
                text-xs font-semibold
                capitalize text-slate-600
                dark:bg-slate-800
                dark:text-slate-300
              "
            >
              {product.category}
            </span>

            <h1
              className="
                text-3xl font-bold
                tracking-tight
                text-slate-900
                dark:text-white
              "
            >
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                <span
                  className="
                    text-sm font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <span className="text-sm text-slate-400 dark:text-slate-500">
                Customer rating
              </span>
            </div>

            <p
              className="
                mt-6 text-3xl font-bold
                text-slate-900
                dark:text-white
              "
            >
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <div className="mt-6">
              <h2
                className="
                  text-sm font-semibold
                  uppercase tracking-wide
                  text-slate-900
                  dark:text-slate-100
                "
              >
                Description
              </h2>

              <p
                className="
                  mt-2 leading-7
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {product.description}
              </p>
            </div>

            <div
              className="
                mt-6 grid grid-cols-2 gap-4
                border-y border-slate-200
                py-5
                dark:border-slate-800
              "
            >
              <div>
                <p
                  className="
                    text-xs font-medium
                    uppercase tracking-wide
                    text-slate-400
                  "
                >
                  Brand
                </p>

                <p
                  className="
                    mt-1 text-sm font-semibold
                    capitalize
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {product.brand || "N/A"}
                </p>
              </div>

              <div>
                <p
                  className="
                    text-xs font-medium
                    uppercase tracking-wide
                    text-slate-400
                  "
                >
                  Stock
                </p>

                <p
                  className="
                    mt-1 text-sm font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {product.stock} available
                </p>
              </div>

              <div>
                <p
                  className="
                    text-xs font-medium
                    uppercase tracking-wide
                    text-slate-400
                  "
                >
                  Discount
                </p>

                <p
                  className="
                    mt-1 text-sm font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {product.discountPercentage.toFixed(0)}% off
                </p>
              </div>

              <div>
                <p
                  className="
                    text-xs font-medium
                    uppercase tracking-wide
                    text-slate-400
                  "
                >
                  Minimum Order
                </p>

                <p
                  className="
                    mt-1 text-sm font-semibold
                    text-slate-800
                    dark:text-slate-200
                  "
                >
                  {product.minimumOrderQuantity}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isMaxQuantityReached}
                className="
                  flex w-full items-center
                  justify-center gap-2
                  rounded-lg
                  bg-slate-900 px-5 py-3
                  font-semibold text-white
                  transition
                  hover:bg-slate-700
                  disabled:cursor-not-allowed
                  disabled:bg-slate-300

                  dark:bg-white
                  dark:text-slate-900
                  dark:hover:bg-slate-200
                  dark:disabled:bg-slate-700
                  dark:disabled:text-slate-400
                "
              >
                <ShoppingCart className="h-5 w-5" />

                {isMaxQuantityReached
                  ? "Maximum quantity reached"
                  : quantity > 0
                    ? `Add Another (${quantity}/5)`
                    : "Add to Cart"}
              </button>

              {quantity > 0 && (
                <p
                  className="
                    mt-2 text-center text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {quantity} item
                  {quantity !== 1 ? "s" : ""} already in
                  your cart
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};