import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useCartStore } from "../../stores/useCartStore";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Cart() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const [couponCode, setCouponCode] = useState("");

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const [couponMessage, setCouponMessage] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      setCouponMessage(t("cart.enterCoupon"));
    } else {
      setCouponMessage(t("cart.couponApplied"));
      setCouponCode("");
    }
    setTimeout(() => {
      setCouponMessage("");
    }, 2000);
  };

  const [updateKey, setUpdateKey] = useState(0);

  const [updated, setUpdated] = useState(false);

  const handleUpdateCart = () => {
    setUpdateKey((prev) => prev + 1);
    setUpdated(true);
    setTimeout(() => setUpdated(false), 1500);
  };

  const shippingCost: number = 0;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-0 py-6 mt-12 mb-12">
        <div className="pe-16 flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted hover:text-dark transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-muted">/</span>
          <span className="text-dark">{t("cart.title")}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 mb-6 text-gray-300">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-semibold text-dark mb-2">
              {t("cart.emptyCart")}
            </h2>
            <p className="text-muted mb-6">{t("cart.startShopping")}</p>
            <Button
              onClick={() => navigate("/")}
              variant="primary"
              className="px-8 py-3"
            >
              {t("cart.startShopping")}
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Table */}
            <div className="mb-6 overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 py-6 px-8 bg-white shadow-sm rounded-md mb-4">
                  <div className="font-heading font-medium text-dark">
                    {t("cart.product")}
                  </div>
                  <div className="font-heading font-medium text-dark text-center">
                    {t("cart.price")}
                  </div>
                  <div className="font-heading font-medium text-dark text-center">
                    {t("cart.quantity")}
                  </div>
                  <div className="font-heading font-medium text-dark text-end">
                    {t("cart.subtotal")}
                  </div>
                </div>

                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-4 gap-4 py-6 px-8 bg-white shadow-sm rounded-md items-center group"
                    >
                      {/* Product */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-white rounded-full
                                        flex items-center justify-center opacity-0 
                                        group-hover:opacity-100 transition-opacity"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-dark line-clamp-2">
                          {item.title}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-center text-dark">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-center">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value),
                            )
                          }
                          className="w-[72px] h-[40px] border border-border rounded-md text-center cursor-pointer
                                      focus:outline-none focus:ring-1 focus:ring-primary 
                                      appearance-auto"
                        />
                      </div>

                      {/* Subtotal */}
                      <div className="text-right text-dark font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex items-center justify-between mb-12">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="px-8 py-3 border-2 border-gray-300 hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                {t("cart.returnToShop")}
              </Button>
              <Button
                onClick={handleUpdateCart}
                variant="outline"
                className="px-8 py-3 border-2 border-gray-300 hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                {t("cart.updateCart")}
              </Button>
              {updated && (
                <span className="text-green-500 text-sm mb-2">
                  {t("cart.cartUpdated")}
                </span>
              )}
            </div>

            {/* Coupon and Cart Total */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Coupon Code */}
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder={t("cart.couponCode")}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-[320px] h-[55px] rounded-[4px] border border-gray-300"
                />
                <Button
                  onClick={handleApplyCoupon}
                  variant="primary"
                  className="w-[420px] h-[55px]"
                >
                  {t("cart.applyCoupon")}
                </Button>
                {couponMessage && (
                  <p className="text-sm text-green-500 mt-2">{couponMessage}</p>
                )}
              </div>

              {/* Cart Total */}
              <div key={updateKey}>
                <div className="lg:ms-auto lg:w-[400px]">
                  <div className="border-2 border-dark rounded-lg p-6">
                    <h3 className="text-xl font-heading font-semibold text-dark mb-6">
                      {t("cart.cartTotal")}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <span className="text-dark">{t("cart.subtotal")}:</span>
                        <span className="text-dark">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pb-4 border-b border-border">
                        <span className="text-dark">{t("cart.shipping")}:</span>
                        <span className="text-dark">
                          {shippingCost === 0
                            ? t("cart.free")
                            : `$${shippingCost.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-dark font-semibold">
                          {t("cart.total")}:
                        </span>
                        <span className="text-dark font-semibold">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate("/checkout")}
                      variant="primary"
                      className="w-[260px] h-[55px] mt-6 translate-x-12"
                    >
                      {t("cart.proceedToCheckout")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
