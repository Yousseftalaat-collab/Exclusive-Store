import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { useCartStore } from "../../stores/useCartStore";
import {
  getProductById,
  getRelatedProducts,
} from "../../services/productsService";
import type { Product } from "../../services/productsService";
import ProductCard from "../../components/common/ProductCard";
import Button from "../../components/ui/Button";
import FullStar from "/assets/icons/Star-Full.png";
import HalfStar from "/assets/icons/Star-half-filled.png";
import EmptyStar from "/assets/icons/Star-Empty.png";
import DeliveryIcon from "/assets/icons/icon-delivery.svg";

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<img key={i} src={FullStar} className="w-5 h-5" />);
    } else if (rating >= i - 0.5) {
      stars.push(<img key={i} src={HalfStar} className="w-5 h-5" />);
    } else {
      stars.push(
        <img key={i} src={EmptyStar} className="w-5 h-5 opacity-40" />,
      );
    }
  }
  return stars;
};

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  // Fetch product data from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      const productData = await getProductById(id);

      if (productData) {
        setProduct(productData);

        // Fetch related products
        const related = await getRelatedProducts(
          productData.product_id,
          productData.category,
          4,
        );
        setRelatedProducts(related);
      } else {
        // Product not found, redirect to 404
        navigate("/404");
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isWishlisted = isInWishlist(product.product_id);

  // Prepare images array
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // Prepare colors array
  const productColors =
    product.colors?.map((color) => ({
      name: color,
      value: color,
    })) || [];

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      useWishlistStore.getState().removeItem(product.product_id);
    } else {
      addToWishlist({
        id: `wishlist-${product.product_id}`,
        productId: product.product_id,
        title: product.title,
        price: product.price,
        oldPrice: product.old_price,
        discount: product.discount,
        image: productImages[0],
        rating: product.rating,
        reviewsCount: product.reviews_count,
        badgeType: product.badge_type,
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${product.product_id}-${Date.now()}`,
      productId: product.product_id,
      title: product.title,
      price: product.price,
      image: productImages[0],
      quantity: quantity,
      color: productColors?.[selectedColor]?.name,
      size: selectedSize || undefined,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-0 py-6 mt-12 mb-12">
        <div className="pr-16 flex items-center gap-2 text-sm ">
          <Link to="/" className="text-muted hover:text-dark transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-muted">/</span>
          {product.subcategory ? (
            <>
              <Link
                to={`/category/${product.subcategory.toLowerCase()}`}
                className="text-muted hover:text-dark transition-colors"
              >
                {product.subcategory}
              </Link>
              <span className="text-muted">/</span>
            </>
          ) : (
            <>
              <Link
                to={`/category/${product.category.toLowerCase()}`}
                className="text-muted hover:text-dark transition-colors"
              >
                {product.category}
              </Link>
              <span className="text-muted">/</span>
            </>
          )}
          <span className="text-dark">{product.title}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="flex gap-4">
            {/* Thumbnails - Only show if multiple images */}
            {productImages.length > 1 && (
              <div className="flex flex-col gap-4">
                {productImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-[170px] h-[140px] rounded-lg  overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-8">
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-[24px] font-heading font-semibold text-dark ">
              {product.title}
            </h2>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted">
                  ({product.reviews_count} {t("product.reviews")})
                </span>
              </div>
              <span className="text-muted">|</span>
              <span
                className={`text-sm font-medium ${
                  product.in_stock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.in_stock
                  ? t("product.inStock")
                  : t("product.outOfStock")}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-heading text-dark">
                ${product.price.toFixed(2)}
              </span>
              {product.old_price && (
                <span className="text-xl text-muted line-through">
                  ${product.old_price.toFixed(2)}
                </span>
              )}
              {product.discount && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-dark leading-relaxed border-b border-border pb-6">
              {product.description ||
                "High-quality product with excellent features and performance."}
            </p>

            {/* Colors */}
            {productColors && productColors.length > 0 && (
              <div>
                <span className="text-dark font-medium mb-3 block">
                  {t("product.colors")}
                </span>
                <div className="flex items-center gap-3">
                  {productColors.map(
                    (color: { name: string; value: string }, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === index
                            ? "border-dark scale-110"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex whitespace-nowrap">
                <span className="text-dark font-medium mb-3 pt-4 pr-4 block">
                  {t("product.size")}:
                </span>
                <div className="flex items-center gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-16 h-12 rounded border-2 transition-all font-medium ${
                        selectedSize === size
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-dark"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex items-center gap-4 pt-4">
              {/* Quantity */}
              <div className="flex items-center border-2 border-border rounded overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors border-r-2 border-border"
                >
                  <svg
                    className="w-5 h-5"
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
                  className="w-16 h-12 text-center font-semibold focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-primary hover:text-white transition-colors border-l-2 border-border bg-primary text-white"
                >
                  <svg
                    className="w-5 h-5"
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

              {/* Buy Now */}
              <Button
                onClick={handleBuyNow}
                variant="primary"
                className="w-[165px] h-[50px]"
              >
                {t("product.buyNow")}
              </Button>

              {/* Wishlist */}
              <button
                onClick={handleWishlistToggle}
                className={`w-12 h-12 rounded border-2 flex items-center justify-center transition-all ${
                  isWishlisted
                    ? "bg-primary border-primary text-white"
                    : "border-border hover:border-primary"
                }`}
              >
                <svg
                  className="w-6 h-6"
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

            {/* Delivery Info */}
            <div className="border-2 border-border rounded-lg divide-y-2 divide-border mt-8">
              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <img className="w-10 h-10" src={DeliveryIcon} />
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">
                    {t("product.freeDelivery")}{" "}
                  </h3>
                  <p className="text-sm text-dark">
                    {t("product.freeDeliveryDesc")}{" "}
                  </p>
                </div>
              </div>

              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-dark mb-1">
                    {t("product.returnDelivery")}{" "}
                  </h3>
                  <p className="text-sm text-dark">{product.return_policy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-5 h-10 bg-primary rounded"></div>
              <h2 className="text-2xl font-heading font-semibold text-dark">
                {t("product.relatedItems")}{" "}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.product_id}
                  id={relatedProduct.product_id}
                  image={relatedProduct.image}
                  title={relatedProduct.title}
                  price={relatedProduct.price}
                  oldPrice={relatedProduct.old_price}
                  discount={relatedProduct.discount}
                  rating={relatedProduct.rating}
                  reviewsCount={relatedProduct.reviews_count}
                  badgeType={relatedProduct.badge_type}
                  colors={relatedProduct.colors}
                  showColors={
                    relatedProduct.colors && relatedProduct.colors.length > 0
                  }
                  description={relatedProduct.description}
                  images={relatedProduct.images}
                  inStock={relatedProduct.in_stock}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
