import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { useCartStore } from "../../stores/useCartStore";
import QuickViewModal from "./QuickViewModal";
import EyeIcon from "/icons/Fill-Eye.png";
import FullStar from "/icons/Star-Full.png";
import HalfStar from "/icons/star-half-filled.png";
import EmptyStar from "/icons/Star-Empty.png";
import DeleteIcon from "/icons/Delete-Icon.svg";
import BasketIcon from "/icons/Basket-Icon.svg";

export type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  badgeType?: "new" | "discount";
  colors?: string[];
  showColors?: boolean;
  layout?: "default" | "compact";
  mode?: "default" | "wishlist" | "recommend";
  onView?: () => void;
  description?: string;
  images?: string[];
  inStock?: boolean;
};

const renderStars = (rating: number) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<img key={i} src={FullStar} className="w-4 h-4" />);
    } else if (rating >= i - 0.5) {
      stars.push(<img key={i} src={HalfStar} className="w-4 h-4" />);
    } else {
      stars.push(
        <img key={i} src={EmptyStar} className="w-4 h-4 opacity-40" />,
      );
    }
  }

  return stars;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  oldPrice,
  discount,
  rating,
  reviewsCount,
  badgeType,
  colors,
  showColors,
  layout = "default",
  mode = "default",
  onView,
  description,
  images,
  inStock,
}) => {
  const navigate = useNavigate();
  const isCompact = layout === "compact";
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id: `wishlist-${id}`,
        productId: id,
        title,
        price,
        oldPrice,
        discount,
        image,
        rating,
        reviewsCount,
        colors,
        badgeType,
      });
      navigate("");
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addToCart({
      id: `cart-${id}-${Date.now()}`,
      productId: id,
      title,
      price,
      image,
      quantity: 1,
    });
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onView) {
      onView();
    } else {
      setIsQuickViewOpen(true);
    }
  };

  return (
    <>
      <div
        className="w-[270px] h-[350px] flex flex-col gap-4 group cursor-pointer"
        onClick={handleCardClick}
      >
        {/* IMAGE AREA */}
        <div className="relative h-[250px] bg-gray-100 rounded-md overflow-hidden">
          {/* Product Image */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="max-h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}

          {badgeType === "new" && (
            <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-xs px-2 py-1 rounded">
              NEW
            </span>
          )}
          {(discount || badgeType === "discount") && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}

          {mode === "wishlist" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromWishlist(id);
              }}
              className="absolute top-3 right-3 w-8 h-8
      bg-white rounded-full shadow
      flex items-center justify-center
      text-gray-600
      hover:bg-red-500 hover:text-white
      transition"
            >
              {" "}
              <img src={DeleteIcon} alt="delete" className="w-4 h-4" />{" "}
            </button>
          )}

          {/* Icons */}
          {(mode === "default" || mode === "recommend") && (
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {mode === "default" && (
                <button
                  onClick={handleWishlistClick}
                  className={`w-8 h-8 rounded-full shadow flex items-center justify-center
                     transition-all duration-200 hover:scale-110 ${
                       isWishlisted ? "bg-primary" : "bg-white"
                     }`}
                >
                  <svg
                    className={`w-5 h-5 ${isWishlisted ? "text-white" : "text-dark"}`}
                    fill={isWishlisted ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={handleViewClick}
                className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center
                     transition-transform duration-200 hover:scale-110"
              >
                <img src={EyeIcon} alt="view" className="w-8 h-8" />
              </button>
            </div>
          )}

          {/* Add to cart */}
          {(mode === "default" ||
            mode === "wishlist" ||
            mode === "recommend") && (
            <button
              onClick={handleAddToCart}
              className={`absolute bottom-0 left-0 w-full h-[41px]
             bg-black text-white text-sm font-medium
                   flex items-center justify-center gap-2
             opacity-0 group-hover:opacity-100
             transition-opacity duration-300
             hover:bg-primary 
              ${
                mode === "default"
                  ? "opacity-0 group-hover:opacity-100"
                  : "opacity-100"
              }
              
              `}
            >
              {(mode === "wishlist" || mode === "recommend") && (
                <img src={BasketIcon} alt="cart" className="w-6 h-6" />
              )}
              Add to Cart
            </button>
          )}
        </div>

        {/* PRODUCT TITLE */}
        <h3 className="text-[16px] font-medium leading-[24px] line-clamp-2">
          {title}
        </h3>

        {/* PRICE */}
        {/* PRICE + RATING */}
        {isCompact ? (
          <div className="flex items-center gap-2">
            <span className="text-primary text-[16px] font-medium">
              ${price}
            </span>
            <div className="flex items-center gap-1">{renderStars(rating)}</div>

            <span className="text-sm text-gray-500">({reviewsCount})</span>
          </div>
        ) : (
          <>
            {/* PRICE */}
            <div className="flex items-center gap-2">
              <span className="text-primary text-[16px] font-medium">
                ${price}
              </span>

              {oldPrice && (
                <span className="text-gray-400 line-through text-[16px] font-medium">
                  ${oldPrice}
                </span>
              )}
            </div>

            {/* RATING */}
            {(mode === "default" || mode === "recommend") && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(rating)}
                </div>
                <span className="text-sm text-gray-500">({reviewsCount})</span>
              </div>
            )}
          </>
        )}

        {/* COLOR CIRCLES */}
        {showColors && colors && mode === "default" && colors.length > 0 && (
          <div className="flex items-center gap-2 mt-1">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Quick View Modal */}
      <QuickViewModal
        product={{
          id,
          title,
          price,
          oldPrice,
          discount,
          rating,
          reviewsCount,
          image,
          images,
          colors,
          description,
          inStock,
        }}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
