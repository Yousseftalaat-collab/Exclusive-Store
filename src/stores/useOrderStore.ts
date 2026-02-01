import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface ShippingAddress {
  fullName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  phoneNumber: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  cancelledAt?: string;
  cancelReason?: string;
}

interface OrderState {
  orders: Order[];
  cancelledOrders: Order[];

  // Actions
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  cancelOrder: (orderId: string, reason: string) => void;

  getOrderById: (orderId: string) => Order | undefined;
  getAllOrders: () => Order[];
  getCancelledOrders: () => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      cancelledOrders: [],

      addOrder: (orderData) => {
        const orderId = `order-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        const newOrder: Order = {
          ...orderData,
          id: orderId,
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
        }));

        setTimeout(() => {
          get().updateOrderStatus(orderId, "processing");
        }, 5000);

        setTimeout(() => {
          get().updateOrderStatus(orderId, "completed");
        }, 12000);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId && order.status !== "cancelled"
              ? { ...order, status }
              : order,
          ),
        }));
      },

      cancelOrder: (orderId, reason) => {
        set((state) => {
          const orderIndex = state.orders.findIndex(
            (order) => order.id === orderId,
          );

          if (orderIndex === -1) return state;

          const order = state.orders[orderIndex];

          if (order.status === "completed") return state;

          const cancelledOrder: Order = {
            ...order,
            status: "cancelled",
            cancelledAt: new Date().toISOString(),
            cancelReason: reason,
          };

          const updatedOrders = [...state.orders];
          updatedOrders.splice(orderIndex, 1);

          return {
            orders: updatedOrders,
            cancelledOrders: [...state.cancelledOrders, cancelledOrder],
          };
        });
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getAllOrders: () => {
        return get().orders;
      },

      getCancelledOrders: () => {
        return get().cancelledOrders;
      },
    }),
    {
      name: "order-storage",
    },
  ),
);
