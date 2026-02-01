import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useOrderStore } from "@/stores/useOrderStore";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  Package,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  X as XIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Button from "@/components/ui/Button";

const MyOrdersPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const orders = useOrderStore((state) => state.orders);
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleCancelClick = (orderId: string) => {
    setOrderToCancel(orderId);
    setCancelModalOpen(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      cancelOrder(
        orderToCancel,
        cancelReason || "Customer requested cancellation",
      );
      setCancelModalOpen(false);
      setOrderToCancel(null);
      setCancelReason("");

      // Navigate to cancellations page to show the cancelled order
      navigate("/cancellations");
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1170px] mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-2 text-sm mb-12">
          <button
            onClick={() => navigate("/")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("account.breadcrumbHome")}
          </button>
          <span className="text-muted">/</span>
          <button
            onClick={() => navigate("/account")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("account.breadcrumbMyAccount")}
          </button>
          <span className="text-muted">/</span>
          <span className="text-dark">{t("orders.title")}</span>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm border-2 border-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header - Always Visible */}
                  <div className="bg-gray-50 border-b-2 border-border p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark text-lg">
                            {t("orders.orderNumber")} #{order.id.slice(0, 16)}
                            ...
                          </p>
                          <p className="text-sm text-muted flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.createdAt).toLocaleDateString(
                              i18n.language === "ar" ? "ar-EG" : "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted mb-1">
                            {t("orders.totalAmount")}{" "}
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            ${order.total.toFixed(2)}
                          </p>
                          <p
                            className={`text-sm font-semibold mt-1 ${
                              order.status === "completed"
                                ? "text-green-600"
                                : order.status === "processing"
                                  ? "text-blue-600"
                                  : order.status === "pending"
                                    ? "text-yellow-600"
                                    : "text-gray-600"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleOrderExpand(order.id)}
                          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-6 h-6 text-dark" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-dark" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Quick Summary - Always Visible */}
                    <div className="mt-4 flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted" />
                        <span className="text-muted">
                          {order.items.length} {t("orders.items")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted" />
                        <span className="text-muted">
                          {order.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="p-6">
                      {/* Order Items */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          {t("orders.orderItems")}
                        </h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-border"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-20 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-dark truncate text-lg">
                                  {item.title}
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <p className="text-sm text-muted">
                                    Qty: {item.quantity}
                                  </p>
                                  {item.color && (
                                    <p className="text-sm text-muted">
                                      Color: {item.color}
                                    </p>
                                  )}
                                  {item.size && (
                                    <p className="text-sm text-muted">
                                      Size: {item.size}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <p className="font-semibold text-dark text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          {t("orders.shippingAddress")}
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-border">
                          <p className="font-medium text-dark mb-2">
                            {order.shippingAddress.fullName}
                          </p>
                          <p className="text-sm text-muted mb-1">
                            {order.shippingAddress.streetAddress}
                            {order.shippingAddress.apartment &&
                              `, ${order.shippingAddress.apartment}`}
                          </p>
                          <p className="text-sm text-muted mb-3">
                            {order.shippingAddress.city}
                          </p>
                          <div className="flex items-center gap-2 pt-2 border-t border-border">
                            <Phone className="w-4 h-4 text-muted" />
                            <p className="text-sm text-muted">
                              {order.shippingAddress.phoneNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-dark mb-4">
                          {t("orders.orderSummary")}
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-border">
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted">
                                {t("orders.subtotal")}:
                              </span>
                              <span className="text-dark font-medium">
                                ${order.subtotal.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted">
                                {t("orders.shipping")}:
                              </span>
                              <span className="text-dark font-medium">
                                {order.shipping === 0
                                  ? t("orders.free")
                                  : `$${order.shipping.toFixed(2)}`}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                            <span className="text-dark">Total:</span>
                            <span className="text-primary">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {order.status === "completed" ? (
                          <Button
                            onClick={() => navigate("/reviews")}
                            variant="primary"
                            className="bg-primary hover:bg-red-600 gap-2"
                          >
                            <Package className="w-4 h-4" />
                            {t("orders.writeReview")}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleCancelClick(order.id)}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-50 gap-2"
                          >
                            <XIcon className="w-4 h-4" />
                            {t("orders.cancelOrder")}
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-muted opacity-50" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-dark mb-2">
              {t("orders.noOrders")}{" "}
            </h3>
            <p className="text-muted mb-6">{t("orders.noOrdersDesc")}</p>
            <Button onClick={() => navigate("/")} variant="primary">
              {t("orders.startShopping")}{" "}
            </Button>
          </div>
        )}
      </div>

      {/* Cancel Order Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-heading font-semibold text-dark">
                {t("orders.cancelTitle")}{" "}
              </h3>
              <button
                onClick={() => setCancelModalOpen(false)}
                className="text-muted hover:text-dark"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <p className="text-muted mb-4">{t("orders.cancelConfirm")}</p>

            <div className="mb-4">
              <label className="text-sm font-medium text-dark mb-2 block">
                {t("orders.cancelReason")}
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder={t("orders.cancelPlaceholder")}
                className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setCancelModalOpen(false)}
                variant="outline"
                fullWidth
              >
                {t("orders.keepOrder")}{" "}
              </Button>
              <Button
                onClick={confirmCancelOrder}
                variant="primary"
                fullWidth
                className="bg-red-500 hover:bg-red-600"
              >
                {t("orders.confirmCancel")}{" "}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
