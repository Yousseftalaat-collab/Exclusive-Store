import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { User, ShoppingBag, X, Star, LogOut } from "lucide-react";
import clsx from "clsx";

const UserProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
          isOpen
            ? "bg-primary text-white"
            : "bg-primary text-white hover:bg-primary/90",
        )}
        aria-label="User Profile"
      >
        <User className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-[230px] bg-gradient-to-b from-[#000000]/80 via-[#000000]/90 to-[#000000] backdrop-blur-md rounded shadow-lg py-3 z-50">
          {/* User Info Section */}
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-sm font-medium text-white truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Manage My Account */}
            <button
              onClick={() => handleMenuClick("/account")}
              className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <User className="w-4 h-4" />
              <span>Manage My Account</span>
            </button>

            {/* My Orders */}
            <button
              onClick={() => handleMenuClick("/orders")}
              className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>My Orders</span>
            </button>

            {/* My Cancellations */}
            <button
              onClick={() => handleMenuClick("/cancellations")}
              className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <X className="w-4 h-4" />
              <span>My Cancellations</span>
            </button>

            {/* My Reviews */}
            <button
              onClick={() => handleMenuClick("/reviews")}
              className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <Star className="w-4 h-4" />
              <span>My Reviews</span>
            </button>

            {/* Divider */}
            <div className="my-1 border-t border-white/10"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 text-left text-sm text-primary hover:bg-white/5 transition-colors flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
