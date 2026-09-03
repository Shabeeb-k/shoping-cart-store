import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'

const MIN_QUANTITY = 1
const MAX_QUANTITY = 5

interface CartStore {
  items: CartItem[]

  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) => {
        set((state) => {
          const existingItem =
            state.items.find(
              (item) =>
                item.product.id === product.id,
            )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + 1,
                        MAX_QUANTITY,
                      ),
                    }
                  : item,
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                product,
                quantity: MIN_QUANTITY,
              },
            ],
          }
        })
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.product.id !== productId,
          ),
        }))
      },

      increaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + 1,
                    MAX_QUANTITY,
                  ),
                }
              : item,
          ),
        }))
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.max(
                    item.quantity - 1,
                    MIN_QUANTITY,
                  ),
                }
              : item,
          ),
        }))
      },

      clearCart: () => {
        set({
          items: [],
        })
      },
    }),
    {
      name: 'shopping-cart-storage',
    },
  ),
)