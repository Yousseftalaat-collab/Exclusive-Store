import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, Package, X } from "lucide-react";
import { useReviewStore } from "@/stores/useReviewStore";
import { useOrderStore } from "@/stores/useOrderStore";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import clsx from "clsx";

const ReviewsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const reviews = useReviewStore((state) => state.reviews);
  const { addReview, canReviewProduct } = useReviewStore();
  const orders = useOrderStore((state) => state.orders);

  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    productId: string;
    orderId: string;
    title: string;
    image: string;
  } | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  // Get all completed orders to show reviewable products
  const completedOrders = orders.filter(
    (order) => order.status === "completed",
  );

  // Get all reviewable products (from completed orders that haven't been reviewed)
  const reviewableProducts = completedOrders.flatMap((order) =>
    order.items
      .filter((item) => canReviewProduct(item.productId, order.id))
      .map((item) => ({
        ...item,
        orderId: order.id,
      })),
  );

  const handleAddReview = (product: (typeof reviewableProducts)[0]) => {
    setSelectedProduct({
      productId: product.productId,
      orderId: product.orderId,
      title: product.title,
      image: product.image,
    });
    setShowAddReviewModal(true);
  };

  const handleSubmitReview = () => {
    if (!selectedProduct || rating === 0) {
      alert(t("reviews.ratingRequired"));
      return;
    }

    addReview({
      productId: selectedProduct.productId,
      productTitle: selectedProduct.title,
      productImage: selectedProduct.image,
      orderId: selectedProduct.orderId,
      rating,
      comment: comment.trim() || t("reviews.noComment"),
      userName: user?.name || "Anonymous",
    });

    // Reset form
    setShowAddReviewModal(false);
    setSelectedProduct(null);
    setRating(0);
    setHoveredRating(0);
    setComment("");
  };

  const handleCloseModal = () => {
    setShowAddReviewModal(false);
    setSelectedProduct(null);
    setRating(0);
    setHoveredRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1170px] mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-12">
          <button
            onClick={() => navigate("/")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("reviews.home")}
          </button>
          <span className="text-muted">/</span>
          <button
            onClick={() => navigate("/account")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("reviews.account")}
          </button>
          <span className="text-muted">/</span>
          <span className="text-dark">{t("reviews.myReviews")}</span>
        </div>

        {/* My Reviews Section */}
        {reviews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-heading font-semibold text-dark mb-6">
              {t("reviews.yourReviews")}({reviews.length})
            </h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-border rounded-lg p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    <img
                      src={review.productImage}
                      alt={review.productTitle}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-dark mb-2">
                        {review.productTitle}
                      </h3>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={clsx(
                              "w-4 h-4",
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300",
                            )}
                          />
                        ))}
                        <span className="text-sm text-muted ml-2">
                          ({review.rating}/5)
                        </span>
                      </div>

                      <p className="text-sm text-dark mb-2">{review.comment}</p>

                      <p className="text-xs text-muted">
                        Reviewed on{" "}
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products to Review */}
        {reviewableProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-heading font-semibold text-dark mb-6">
              {t("reviews.productsToReview")} ({reviewableProducts.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewableProducts.map((product) => (
                <div
                  key={`${product.productId}-${product.orderId}`}
                  className="bg-white border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="font-medium text-dark mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <Button
                    onClick={() => handleAddReview(product)}
                    variant="primary"
                    fullWidth
                    className="bg-primary hover:bg-red-600 text-white"
                  >
                    {t("reviews.writeReview")}{" "}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 && reviewableProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-heading font-semibold text-dark mb-2">
              {t("reviews.noReviewsTitle")}{" "}
            </h2>
            <p className="text-muted mb-6">{t("reviews.noReviewsDesc")}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted">
              <Package className="w-4 h-4" />
              <span>{t("reviews.completedOrdersHint")}</span>
            </div>
          </div>
        )}
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-heading font-semibold text-dark">
                {t("reviews.writeAReview")}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-muted hover:text-dark"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex gap-3 mb-6 p-3 bg-gray-50 rounded">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium text-dark text-sm">
                  {selectedProduct.title}
                </p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-2">
                {t("reviews.yourRating")}
                <span className="text-primary">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={clsx(
                        "w-8 h-8",
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark mb-2">
                {t("reviews.yourReview")}{" "}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleCloseModal} variant="outline" fullWidth>
                {t("reviews.cancel")}
              </Button>
              <Button
                onClick={handleSubmitReview}
                variant="primary"
                fullWidth
                className="bg-primary hover:bg-red-600"
              >
                {t("reviews.submitReview")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
