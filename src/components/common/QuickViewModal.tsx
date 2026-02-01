import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { useCartStore } from "../../stores/useCartStore";
import Button from "../ui/Button";
import FullStar from "/assets/icons/Star-Full.png";
import HalfStar from "/assets/icons/Star-half-filled.png";
import EmptyStar from "/assets/icons/Star-Empty.png";

interface QuickViewModalProps {
  product: {
    id: string;
    title: string;
    price: number;
    oldPrice?: number;
    discount?: number;
    rating: number;
    reviewsCount: number;
    image: string;
    images?: string[];
    colors?: string[];
    description?: string;
    inStock?: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

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

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem: addToCart } = useCartStore();
  const {
    isInWishlist,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
  } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);
  const images = product.images || [product.image];

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${product.id}-${Date.now()}`,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
    onClose();
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: `wishlist-${product.id}`,
        productId: product.id,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        image: product.image,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
      });
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
        >
          <svg
            className="w-6 h-6"
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

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center p-8">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-semibold text-dark pr-8">
              {product.title}
            </h2>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted">
                  ({product.reviewsCount})
                </span>
              </div>
              <span className="text-muted">|</span>
              <span
                className={`text-sm font-medium ${
                  product.inStock !== false ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.inStock !== false ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-heading text-dark">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-lg text-muted line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  {product.discount && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted text-sm leading-relaxed border-b border-border pb-4">
                {product.description}
              </p>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-dark font-medium mb-2 block text-sm">
                  Colours:
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <span className="text-dark font-medium mb-2 block text-sm">
                Quantity:
              </span>
              <div className="flex items-center border border-border rounded overflow-hidden w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-12 h-10 text-center font-semibold focus:outline-none border-x border-border"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                className="flex-1"
              >
                Add to Cart
              </Button>
              <button
                onClick={handleWishlistToggle}
                className={`w-12 h-12 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                  isWishlisted
                    ? "bg-primary border-primary text-white"
                    : "border-border hover:border-primary"
                }`}
              >
                <svg
                  className="w-5 h-5"
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
            </div>

            {/* View Details Button */}
            <button
              onClick={handleViewDetails}
              className="w-full text-center text-primary hover:text-primary/80 transition-colors text-sm font-medium underline"
            >
              View Full Details →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>,
    document.body,
  );
}
