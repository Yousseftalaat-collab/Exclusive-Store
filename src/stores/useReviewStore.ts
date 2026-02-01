import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
}

interface ReviewState {
  reviews: Review[];

  // Actions
  addReview: (review: Omit<Review, "id" | "createdAt">) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAllReviews: () => Review[];
  canReviewProduct: (productId: string, orderId: string) => boolean;
}

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          reviews: [...state.reviews, newReview],
        }));
      },

      getReviewsByProduct: (productId) => {
        const state = get();
        return state.reviews.filter((r) => r.productId === productId);
      },

      getAllReviews: () => {
        return get().reviews;
      },

      canReviewProduct: (productId, orderId) => {
        const state = get();
        // Check if user hasn't already reviewed this product from this order
        return !state.reviews.some(
          (r) => r.productId === productId && r.orderId === orderId,
        );
      },
    }),
    {
      name: "review-storage",
    },
  ),
);
