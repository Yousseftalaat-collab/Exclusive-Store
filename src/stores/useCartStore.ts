import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart item type definition
export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

// Cart state interface
interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Computed values
  totalItems: number;
  totalPrice: number;

  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Create the cart store with persistence
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      // Add item to cart
      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.color === item.color &&
            i.size === item.size
        );

        let newItems: CartItem[];

        if (existingItemIndex > -1) {
          // Item exists, update quantity
          newItems = items.map((i, index) =>
            index === existingItemIndex
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        } else {
          // New item, add to cart
          newItems = [
            ...items,
            {
              ...item,
              quantity: item.quantity || 1,
            } as CartItem,
          ];
        }

        // Calculate totals
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        set({
          items: newItems,
          totalItems,
          totalPrice,
        });
      },

      // Remove item from cart
      removeItem: (id) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== id);

        // Calculate totals
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        set({
          items: newItems,
          totalItems,
          totalPrice,
        });
      },

      // Update item quantity
      updateQuantity: (id, quantity) => {
        const { items } = get();

        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          get().removeItem(id);
          return;
        }

        const newItems = items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        // Calculate totals
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );

        set({
          items: newItems,
          totalItems,
          totalPrice,
        });
      },

      // Clear all items from cart
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      // Toggle cart drawer
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Open cart drawer
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart drawer
      closeCart: () => {
        set({ isOpen: false });
      },
    }),
    {
      name: "cart-storage", // Key in localStorage
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);
