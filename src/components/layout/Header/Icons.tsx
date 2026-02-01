import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import Badge from "../../ui/Badge";
import UserProfileDropdown from "./UserProfileDropdown";
import { useAuthStore } from "@/stores/useAuthStore";

interface HeaderIconsProps {
  wishlistCount?: number;
  cartCount?: number;
}

const HeaderIcons: React.FC<HeaderIconsProps> = ({
  wishlistCount = 0,
  cartCount = 0,
}) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-6">
      {/* Wishlist - Always visible */}
      <button
        onClick={() => navigate("/wishlist")}
        aria-label="Wishlist"
        className="relative hover:opacity-75 transition-opacity group"
      >
        <Heart className="w-5 h-5 text-dark group-hover:text-primary transition-colors" />

        {wishlistCount > 0 && (
          <Badge className="absolute -top-2 -right-2">{wishlistCount}</Badge>
        )}
      </button>

      {/* Cart - Always visible */}
      <button
        onClick={() => navigate("/cart")}
        aria-label="Cart"
        className="relative hover:opacity-75 transition-opacity group"
      >
        <ShoppingCart className="w-5 h-5 text-dark group-hover:text-primary transition-colors" />

        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2">{cartCount}</Badge>
        )}
      </button>

      {/* User Profile Dropdown (only when logged in) */}
      {isAuthenticated && <UserProfileDropdown />}
    </div>
  );
};

export default HeaderIcons;
