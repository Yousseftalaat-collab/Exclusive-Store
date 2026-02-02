import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Input from "../../ui/Input";
import { searchProducts } from "../../../services/productsService";
import type { Product } from "../../../services/productsService";
import Vector from "/assets/images/Vector.png";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Live search as user types
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);

      try {
        const results = await window.searchProductsAPI(searchQuery);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search by 300ms
    const timeoutId = setTimeout(searchProducts, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to make searchProducts available
  window.searchProductsAPI = searchProducts;

  const handleProductClick = (productId: string) => {
    setShowResults(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  return (
    <div className="relative w-[243px]" ref={searchRef}>
      {/* Search Input */}
      <div className="relative h-[38px]">
        {/* Icon */}
        <img
          src={Vector}
          alt="search"
          className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10"
        />

        {/* Input */}
        <Input
          type="text"
          placeholder={t("nav.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            h-[38px]
            rounded-[4px]
            bg-[#F5F5F5]
            border-none
            pe-10
            text-sm
          "
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-border max-h-[400px] overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-muted">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((product) => (
                <button
                  key={product.product_id}
                  onClick={() => handleProductClick(product.product_id)}
                  className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 text-left"
                >
                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark truncate">
                      {product.title}
                    </p>
                    <p className="text-sm text-primary font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery.trim().length >= 2 ? (
            <div className="p-4 text-center text-muted">
              {t("common.noResults")} "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

// Declare global type for window
declare global {
  interface Window {
    searchProductsAPI: typeof searchProducts;
  }
}

export default SearchBar;
