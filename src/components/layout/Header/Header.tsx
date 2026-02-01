import { useLocation } from "react-router-dom";
import { useWishlistStore } from "../../../stores/useWishlistStore";
import { useCartStore } from "../../../stores/useCartStore";
import Logo from "./Logo";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import HeaderIcons from "./Icons";

const Header: React.FC = () => {
  const location = useLocation();
  const wishlistItems = useWishlistStore((state) => state.items);
  const cartItems = useCartStore((state) => state.items);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="h-[85px] border-b border-border">
      <div className="max-w-[1770px] mx-auto h-full flex items-center px-24 pt-6">
        {/* Logo */}
        <Logo />
        {/* Menu */}
        <div className="ml-52">
          <Menu />
        </div>
        {/* Search */}
        <div className="ml-36">
          <SearchBar />
        </div>
        {/* Icons */}
        {!isAuthPage && (
          <div className="ml-8">
            <HeaderIcons
              wishlistCount={wishlistItems.length}
              cartCount={cartItems.length}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
