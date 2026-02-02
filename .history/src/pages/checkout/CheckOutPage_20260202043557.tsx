import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/stores/useCartStore";
import { useOrderStore } from "@/stores/useOrderStore";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import VisaIconFirst from "/icons/image-30.svg";
import VisaIconSecond from "/icons/image-31.svg";
import VisaIconThird from "/icons/image-32.svg";
import VisaIconFour from "/icons/image-33.svg";

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items: cartItems } = useCartStore();
  const { addOrder } = useOrderStore();
  const { user, isAuthenticated } = useAuthStore();

  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cash">("bank");
  const [couponCode, setCouponCode] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    companyName: "",
    streetAddress: user?.address || "",
    apartment: "",
    city: "",
    phoneNumber: "",
    emailAddress: user?.email || "",
    saveInfo: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const total = subtotal + shipping;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems.length, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = t("errors.firstNameRequired");
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = t("errors.streetRequired");
    if (!formData.city.trim()) newErrors.city = t("errors.cityRequired");

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t("errors.phoneRequired");
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t("errors.phoneInvalid");
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = t("errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = t("errors.emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return;
    }

    // Create order
    const orderData = {
      items: cartItems,
      subtotal,
      shipping,
      total,
      shippingAddress: {
        fullName: formData.firstName,
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
      },
      paymentMethod:
        paymentMethod === "bank" ? "Bank Card" : "Cash on Delivery",
    };

    addOrder(orderData);

    // Navigate to success page
    navigate("/order-success");
  };
  const [couponMessage, setCouponMessage] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      setCouponMessage(t(".coupon.empty"));
    } else {
      setCouponMessage(t("coupon.applied", { code: couponCode }));
      setCouponCode("");
    }
    setTimeout(() => {
      setCouponMessage("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1170px] mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-20">
          <button
            onClick={() => navigate("/")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("breadcrumb.account")}
          </button>
          <span className="text-muted">/</span>
          <button
            onClick={() => navigate("/account")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("breadcrumb.myAccount")}
          </button>
          <span className="text-muted">/</span>
          <span className="text-muted"> {t("breadcrumb.product")}</span>
          <span className="text-muted">/</span>
          <button
            onClick={() => navigate("/cart")}
            className="text-muted hover:text-dark transition-colors"
          >
            {t("breadcrumb.viewCart")}
          </button>
          <span className="text-muted">/</span>
          <span className="text-dark"> {t("breadcrumb.checkout")}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-40">
          {/* Left Column - Billing Details */}
          <div>
            <h2 className="text-4xl font-inter font-medium text-dark mb-12">
              {t("checkout.title")}
            </h2>

            <div className="space-y-8">
              {/* First Name */}
              <div>
                <label className="block text-base text-muted mb-2 font-poppins">
                  {t("checkout.firstName")}{" "}
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-base text-muted mb-2 font-poppins">
                  {t("checkout.companyName")}
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-base text-muted mb-2 font-poppins">
                  {t("checkout.streetAddress")}{" "}
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.streetAddress}
                  </p>
                )}
              </div>

              {/* Apartment/Suite */}
              <div>
                <label className="block text-base text-muted mb-2 font-poppins">
                  {t("checkout.apartment")}
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                />
              </div>

              {/* Town/City */}
              <div>
                <label className="block text-base text-muted mb-2 font-poppins">
                  {t("checkout.city")}
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-base text-muted mb-2 font-poppins">
                  {t("checkout.phone")} <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-base text-muted mb-2 font-poppins">
                  {t("checkout.email")} <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailAddress}
                  </p>
                )}
              </div>
              {/* Save Information */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label
                  htmlFor="saveInfo"
                  className="text-sm text-dark cursor-pointer"
                >
                  {t("checkout.saveInfo")}
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Payment */}
          <div className="space-y-8 mt-28">
            {/* Order Items */}
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain"
                    />
                    <p className="text-base font-poppins text-dark">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-base font-poppins text-dark">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal & Shipping */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex justify-between">
                <span className="text-base font-poppins text-dark">
                  {t("checkout.subtotal")}
                </span>
                <span className="text-base font-poppins text-dark">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pb-4 border-b border-border">
                <span className="text-base font-poppins text-dark">
                  {t("checkout.shipping")}
                </span>
                <span className="text-base font-poppins text-dark">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="text-base font-poppins text-dark">
                  {t("checkout.total")}:
                </span>
                <span className="text-base font-poppins text-dark font-medium">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-6">
              {/* Bank Payment */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as "bank" | "cash")
                    }
                    className="w-6 h-6 text-primary accent-black cursor-pointer"
                  />
                  <span className="text-base font-poppins text-dark">
                    {t("checkout.bank")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Payment Icons as styled boxes matching Figma design */}
                  <div className="w-10 h-7 flex items-center justify-center rounded-sm">
                    <img src={VisaIconThird} alt="Visa Icon 3" />
                  </div>
                  <div className="w-10 h-7  flex items-center justify-center rounded-sm">
                    <img src={VisaIconFirst} alt="Visa Icon 1" />
                  </div>
                  <div className="w-10 h-7 bg-gradient-to-br flex items-center justify-center rounded-sm">
                    <div className="flex -space-x-1">
                      <img src={VisaIconSecond} alt="Visa Icon 2" />
                    </div>
                  </div>
                  <div className="w-10 h-7  flex items-center justify-center rounded-sm">
                    <img src={VisaIconFour} alt="Visa Icon 4" />
                  </div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as "bank" | "cash")
                  }
                  className="w-6 h-6 text-primary accent-black cursor-pointer"
                />
                <span className="text-base font-poppins text-dark">
                  {t("checkout.cashOnDelivery")}
                </span>
              </label>
            </div>

            {/* Coupon Code */}
            <div className="flex gap-4 pt-6">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-3 border border-dark rounded text-base font-poppins text-dark outline-none focus:border-primary transition-colors"
              />
              <Button
                onClick={handleApplyCoupon}
                variant="primary"
                className="px-12 py-4 bg-primary hover:bg-red-600 text-white rounded font-poppins text-base"
              >
                {t("checkout.applyCoupon")}
              </Button>
              {couponMessage && (
                <p className="text-sm text-green-500 mt-2">{couponMessage}</p>
              )}
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              variant="primary"
              className="px-12 py-4 bg-primary hover:bg-red-600 text-white rounded font-poppins text-base"
            >
              {t("checkout.placeOrder")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
