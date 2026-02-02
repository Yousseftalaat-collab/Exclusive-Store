import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { useCartStore } from "../../stores/useCartStore";
import ProductCard from "../../components/common/ProductCard";
import Button from "../../components/ui/Button";
import Laptop from "/images/laptop.png";
import TV from "/images/TV.png";
import Controllar from "/images/Controllar.png";
import Keyboard from "/images/Keyboard.png";

export default function WishlistPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { items, moveAllToCart } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleMoveAllToBag = () => {
    if (items.length === 0) return;

    moveAllToCart(addToCart);
    navigate("/cart");
  };

  const recommendedProducts = [
    {
      id: "1",
      productId: "1",
      image: Laptop,
      title: "ASUS FHD Gaming Laptop",
      price: 960.0,
      rating: 5,
      reviewsCount: 65,
      oldPrice: 1160,
      discount: 35,
      badgeType: "discount",
    },
    {
      id: "2",
      productId: "2",
      image: TV,
      title: "IPS LCD Gaming Monitor",
      price: 1160,
      rating: 5,
      reviewsCount: 65,
    },
    {
      id: "3",
      productId: "3",
      image: Controllar,
      title: "HAVIT HV-G92 Gamepad",
      price: 560,
      rating: 5,
      reviewsCount: 65,
      badgeType: "new",
    },
    {
      id: "4",
      productId: "4",
      image: Keyboard,
      title: "AK-900 Wired Keyboard",
      price: 200,
      rating: 5,
      reviewsCount: 65,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6"></div>

      <div className="container mx-auto px-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-heading">
            {t("wishlist.title")} ({items.length})
          </h2>
          {items.length > 0 && (
            <Button
              onClick={handleMoveAllToBag}
              variant="outline"
              className="px-8 py-3 border-2 border-gray-300 hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              {t("wishlist.moveAllToBag")}
            </Button>
          )}
        </div>

        {/* Wishlist Items */}
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-semibold text-dark mb-2">
              {t("wishlist.empty")}
            </h2>
            <p className="text-muted mb-6">
              Add products you love to your wishlist!
            </p>
            <Button
              onClick={() => navigate("/")}
              variant="primary"
              className="px-8 py-3"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="relative">
                <ProductCard
                  mode="wishlist"
                  id={item.productId}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  discount={item.discount}
                  rating={item.rating}
                  reviewsCount={item.reviewsCount}
                  badgeType={item.badgeType}
                  colors={item.colors}
                  showColors={!!item.colors && item.colors.length > 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Just For You Section - Show recommended products */}
        {items.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-5 h-10 bg-primary rounded"></div>
                <h2 className="text-2xl font-heading font-semibold text-dark">
                  {t("wishlist.justForYou")}
                </h2>
              </div>
              <Button
                onClick={() => navigate("/our-products")}
                variant="outline"
                className="px-8 py-3 border-2 border-gray-300 hover:bg-primary hover:border-primary hover:text-white transition-all"
              >
                {t("wishlist.seeAll")}
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  mode="recommend"
                  id={product.productId}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discount={product.discount}
                  rating={product.rating}
                  reviewsCount={product.reviewsCount}
                  onView={() => navigate(`/product/${product.productId}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
