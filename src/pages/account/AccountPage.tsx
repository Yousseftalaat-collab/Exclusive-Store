import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/stores/useAuthStore";
import { useOrderStore } from "@/stores/useOrderStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { MapPin, X, Package } from "lucide-react";
import Button from "@/components/ui/Button";
import clsx from "clsx";

type ActiveSection =
  | "profile"
  | "addressBook"
  | "paymentOptions"
  | "returns"
  | "cancellations"
  | "wishlist";

const AccountPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ActiveSection>("profile");

  // Form states
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showReturnsModal, setShowReturnsModal] = useState(false);
  const [showCancellationsModal, setShowCancellationsModal] = useState(false);

  const orders = useOrderStore((state) => state.orders);
  const cancelledOrders = useOrderStore((state) => state.cancelledOrders);
  const wishlistItems = useWishlistStore((state) => state.items);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    const updates: Partial<typeof user> = {};

    // Update user name if changed
    if (formData.firstName || formData.lastName) {
      const newName = `${formData.firstName} ${formData.lastName}`.trim();
      if (newName !== user?.name && newName) {
        updates.name = newName;
      }
    }

    // Update email if changed
    if (formData.email !== user?.email && formData.email) {
      updates.email = formData.email;
    }

    // Update address if changed
    if (formData.address !== user?.address && formData.address) {
      updates.address = formData.address;
    }

    // Validate password change
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.confirmPassword
    ) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("New passwords do not match!");
        return;
      }
      if (formData.newPassword.length < 6) {
        alert("New password must be at least 6 characters!");
        return;
      }
      // In a real app, you would validate current password and update via Supabase
      alert("Password change functionality will be implemented with backend!");
    }

    // Apply updates
    if (Object.keys(updates).length > 0) {
      updateUser(updates);
      alert("Changes saved successfully!");
    } else {
      alert("No changes to save!");
    }
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      email: user?.email || "",
      address: user?.address || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Mock returns data (you can replace with actual data)
  const returnedItems = orders
    .filter((order) => order.status === "completed")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1170px] mx-auto">
        {/* Breadcrumb + Welcome */}
        <div className="flex items-center justify-between mb-20">
          {/* Left: Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate("/")}
              className="text-muted hover:text-dark transition-colors"
            >
              {t("account.breadcrumbHome")}
            </button>
            <span className="text-muted">/</span>
            <span className="text-dark">
              {" "}
              {t("account.breadcrumbMyAccount")}
            </span>
          </div>

          {/* Right: Welcome */}
          <p className="text-sm font-normal text-dark font-poppins">
            {t("account.welcome")}{" "}
            <span className="text-primary">{user?.name || "User"}</span>
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[250px,1fr] gap-32">
          {/* Left Navigation */}
          <div className="space-y-6">
            {/* Manage My Account Section */}
            <div>
              <h3 className="text-base font-medium text-dark mb-4 font-poppins">
                {t("account.manageAccount")}
              </h3>
              <div className="space-y-2 ml-8">
                <button
                  onClick={() => setActiveSection("profile")}
                  className={clsx(
                    "block text-base font-poppins transition-colors",
                    activeSection === "profile"
                      ? "text-primary"
                      : "text-muted hover:text-primary",
                  )}
                >
                  {t("account.myProfile")}{" "}
                </button>
                <button
                  onClick={() => setActiveSection("addressBook")}
                  className={clsx(
                    "block text-base font-poppins transition-colors",
                    activeSection === "addressBook"
                      ? "text-primary"
                      : "text-muted hover:text-primary",
                  )}
                >
                  {t("account.addressBook")}{" "}
                </button>
                <button
                  onClick={() => setActiveSection("paymentOptions")}
                  className={clsx(
                    "block text-base font-poppins transition-colors",
                    activeSection === "paymentOptions"
                      ? "text-primary"
                      : "text-muted hover:text-primary",
                  )}
                >
                  {t("account.paymentOptions")}
                </button>
              </div>
            </div>

            {/* My Orders Section */}
            <div>
              <h3 className="text-base font-medium text-dark mb-4 font-poppins">
                {t("account.myOrders")}
              </h3>
              <div className="space-y-2 ml-8">
                <button
                  onClick={() => setShowReturnsModal(true)}
                  className="block text-base font-poppins text-muted hover:text-primary transition-colors"
                >
                  {t("account.myReturns")}
                </button>
                <button
                  onClick={() => setShowCancellationsModal(true)}
                  className="block text-base font-poppins text-muted hover:text-primary transition-colors"
                >
                  {t("account.myCancellations")}
                </button>
              </div>
            </div>

            {/* My Wishlist Section */}
            <div>
              <button
                onClick={() => setActiveSection("wishlist")}
                className={clsx(
                  "text-base font-medium font-poppins transition-colors",
                  activeSection === "wishlist"
                    ? "text-primary"
                    : "text-dark hover:text-primary",
                )}
              >
                {t("account.myWishlist")}
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div>
            {/* My Profile Section */}
            {activeSection === "profile" && (
              <div className="bg-white rounded shadow-sm p-8 lg:p-12 ">
                <h2 className="text-primary text-xl font-medium mb-6 font-poppins">
                  {t("account.editProfile")}{" "}
                </h2>

                <form className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[16px] text-dark mb-2 font-poppins">
                        {t("account.firstName")}{" "}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] text-dark mb-2 font-poppins">
                        {t("account.lastName")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                      />
                    </div>
                  </div>

                  {/* Email & Address */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[16px] text-dark mb-2 font-poppins">
                        {t("account.email")}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] text-dark mb-2 font-poppins">
                        {t("account.address")}
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark"
                      />
                    </div>
                  </div>

                  {/* Password Changes */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-dark font-poppins">
                      {t("account.passwordChanges")}{" "}
                    </h3>
                    <div>
                      <input
                        type="password"
                        name="currentPassword"
                        placeholder={t("account.currentPassword")}
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark placeholder:text-muted"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="newPassword"
                        placeholder={t("account.newPassword")}
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark placeholder:text-muted"
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder={t("account.confirmPassword")}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded border-0 outline-none focus:bg-gray-100 transition-colors text-sm font-poppins text-dark placeholder:text-muted"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-8 pt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-12 py-4 text-dark font-poppins text-base hover:text-primary transition-colors"
                    >
                      {t("account.cancel")}{" "}
                    </button>
                    <Button
                      type="button"
                      onClick={handleSaveChanges}
                      variant="primary"
                      className="px-8 py-1 bg-primary hover:bg-red-600 text-white rounded font-poppins text-base"
                    >
                      {t("account.saveChanges")}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Address Book Section */}
            {activeSection === "addressBook" && (
              <div className="bg-white rounded shadow-sm p-8 lg:p-20">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <h2 className="text-primary text-xl font-medium font-poppins">
                    {t("account.addressBook")}{" "}
                  </h2>
                  <Button
                    variant="primary"
                    className="gap-2 px-6 py-3 bg-primary hover:bg-red-600 text-white rounded font-poppins"
                  >
                    <MapPin className="w-4 h-4" />
                    {t("account.addAddress")}
                  </Button>
                </div>
                <div className="text-center py-16 text-muted">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="font-poppins">{t("account.noAddresses")}</p>
                </div>
              </div>
            )}

            {/* Payment Options Section */}
            {activeSection === "paymentOptions" && (
              <div className="bg-white rounded shadow-sm p-8 lg:p-20">
                <h2 className="text-primary text-xl font-medium mb-6 font-poppins">
                  {t("account.paymentOptions")}{" "}
                </h2>
                <div className="text-center py-16 text-muted">
                  <p className="font-poppins">{t("account.noPayments")}</p>
                </div>
              </div>
            )}

            {/* Wishlist Section */}
            {activeSection === "wishlist" && (
              <div className="bg-white rounded shadow-sm p-8 lg:p-20">
                <h2 className="text-primary text-xl font-medium mb-6 font-poppins">
                  {t("account.myWishlist")}{" "}
                </h2>

                {wishlistItems.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-border rounded-lg p-4 hover:shadow-lg transition-shadow"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded mb-3"
                        />
                        <h4 className="font-medium text-dark mb-2 font-poppins">
                          {item.title}
                        </h4>
                        <p className="text-primary font-semibold mb-3 font-poppins">
                          ${item.price.toFixed(2)}
                        </p>
                        <Button
                          onClick={() => navigate(`/product/${item.productId}`)}
                          variant="outline"
                          fullWidth
                          className="font-poppins"
                        >
                          {t("account.viewProduct")}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-muted">
                    <p className="font-poppins">{t("account.wishlistEmpty")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Returns Modal */}
      {showReturnsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark font-poppins">
                {t("account.myReturns")}{" "}
              </h2>
              <button
                onClick={() => setShowReturnsModal(false)}
                className="text-muted hover:text-dark transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {returnedItems.length > 0 ? (
                returnedItems.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-dark font-poppins">
                        {t("account.order")} #{order.id.slice(0, 12)}...
                      </p>
                      <span className="text-sm text-muted font-poppins">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 mt-3"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-dark font-poppins">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted font-poppins">
                            {t("account.qty")}: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-primary font-poppins">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="mt-3 text-sm text-muted font-poppins">
                      <p>Reason: Product had quality issues</p>
                      <p>Status: Return in progress</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="font-poppins">{t("account.returnsEmpty")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancellations Modal */}
      {showCancellationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark font-poppins">
                {t("account.myCancellations")}{" "}
              </h2>
              <button
                onClick={() => setShowCancellationsModal(false)}
                className="text-muted hover:text-dark transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {cancelledOrders.length > 0 ? (
                cancelledOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-dark font-poppins">
                        {t("account.order")} #{order.id.slice(0, 12)}...
                      </p>
                      <span className="text-sm text-red-600 font-poppins">
                        Cancelled
                      </span>
                    </div>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 mt-3"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-dark font-poppins">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted font-poppins">
                            {t("account.qty")}: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-dark font-poppins">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-border text-sm text-muted font-poppins">
                      <p>
                        {t("account.cancelledOn")}:{" "}
                        {new Date(order.cancelledAt!).toLocaleDateString()}
                      </p>
                      {order.cancelReason && (
                        <p>Reason: {order.cancelReason}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted">
                  <X className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="font-poppins">
                    {t("account.cancellationsEmpty")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
