import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../pages/cart/Cart";
// Wishlist item type definition
export interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  colors?: string[];
  badgeType?: "new" | "discount";
}

// Wishlist state interface
interface WishlistState {
  items: WishlistItem[];

  // Actions
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  moveAllToCart: (addToCartFn: (item: CartItem) => void) => void;
}
const generateCartItemId = (productId: string) =>
  `cart-${productId}-${crypto.randomUUID()}`;

// Create the wishlist store with persistence
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],

      // Add item to wishlist
      addItem: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.productId === item.productId);

        if (!exists) {
          set({
            items: [...items, item],
          });
        }
      },

      // Remove item from wishlist
      removeItem: (productId) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.productId !== productId),
        });
      },

      // Check if item is in wishlist
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.productId === productId);
      },

      // Clear all items from wishlist
      clearWishlist: () => {
        set({ items: [] });
      },

      // Move all items to cart
      moveAllToCart: (addToCartFn) => {
        const { items } = get();
        items.forEach((item) => {
          addToCartFn({
            id: generateCartItemId(item.productId),
            productId: item.productId,
            title: item.title,
            price: item.price,
            image: item.image,
            quantity: 1,
          });
        });
        // Clear wishlist after moving
        set({ items: [] });
      },
    }),
    {
      name: "wishlist-storage", // Key in localStorage
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
