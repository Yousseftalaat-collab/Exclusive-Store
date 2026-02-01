import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useOrderStore } from "@/stores/useOrderStore";
import { Package, Calendar, DollarSign, MapPin, Phone, X } from "lucide-react";
import Button from "@/components/ui/Button";

const CancellationsPage: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const cancelledOrders = useOrderStore((state) => state.cancelledOrders);

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1170px] mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-12">
          <button
            onClick={() => navigate("/")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("nav.home")}
          </button>
          <span className="text-muted">/</span>
          <button
            onClick={() => navigate("/account")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("breadcrumb.myAccount")}
          </button>
          <span className="text-muted">/</span>
          <span className="text-dark">{t("orders.myCancellations")}</span>
        </div>

        {/* Cancelled Orders List */}
        {cancelledOrders.length > 0 ? (
          <div className="space-y-6">
            {cancelledOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-border overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-red-50 border-b border-red-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark">
                          {t("orders.orderCancelled")}{" "}
                        </p>
                        <p className="text-sm text-muted">
                          Order ID: {order.id.slice(0, 16)}...
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted">
                        {t("orders.cancelledOn")}
                      </p>
                      <p className="font-medium text-dark">
                        {order.cancelledAt
                          ? new Date(order.cancelledAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Order Info */}
                    <div>
                      <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        {t("orders.orderInformation")}{" "}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-muted mt-1" />
                          <div>
                            <p className="text-sm text-muted">
                              {t("orders.orderedOn")}
                            </p>
                            <p className="text-sm font-medium text-dark">
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-US",
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

                        <div className="flex items-start gap-2">
                          <DollarSign className="w-4 h-4 text-muted mt-1" />
                          <div>
                            <p className="text-sm text-muted">
                              {t("orders.totalAmount")}
                            </p>
                            <p className="text-sm font-medium text-dark">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Package className="w-4 h-4 text-muted mt-1" />
                          <div>
                            <p className="text-sm text-muted">
                              {t("orders.paymentMethod")}
                            </p>
                            <p className="text-sm font-medium text-dark">
                              {order.paymentMethod}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold text-dark mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {t("orders.shippingAddress")}
                      </h3>

                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <p className="font-medium text-dark">
                          {order.shippingAddress.fullName}
                        </p>
                        <p className="text-sm text-muted">
                          {order.shippingAddress.streetAddress}
                          {order.shippingAddress.apartment &&
                            `, ${order.shippingAddress.apartment}`}
                        </p>
                        <p className="text-sm text-muted">
                          {order.shippingAddress.city}
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <Phone className="w-4 h-4 text-muted" />
                          <p className="text-sm text-muted">
                            {order.shippingAddress.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation Reason */}
                  {order.cancelReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-sm font-medium text-dark mb-1">
                        {t("orders.cancellationReason")}:
                      </p>
                      <p className="text-sm text-muted">{order.cancelReason}</p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-dark mb-4">
                      {t("orders.orderItems")} ({order.items.length})
                    </h3>

                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-dark truncate">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
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
                          <p className="font-semibold text-dark">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="max-w-xs ml-auto space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">
                          {t("orders.subtotal")}:
                        </span>
                        <span className="text-dark">
                          ${order.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">
                          {t("orders.shipping")}:
                        </span>
                        <span className="text-dark">
                          {order.shipping === 0
                            ? "Free"
                            : `$${order.shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                        <span className="text-dark">{t("orders.total")}:</span>
                        <span className="text-primary">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-muted opacity-50" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-dark mb-2">
              {t("orders.noCancelledOrders")}{" "}
            </h3>
            <p className="text-muted mb-6">
              {t("orders.noCancelledOrdersDesc")}{" "}
            </p>
            <Button onClick={() => navigate("/")} variant="primary">
              {t("orders.continueShopping")}{" "}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancellationsPage;
