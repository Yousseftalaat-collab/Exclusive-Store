import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getProductsByCategory,
  getProductsBySubCategory,
} from "../../services/productsService";
import type { Product } from "../../services/productsService";
import ProductCard from "../../components/common/ProductCard";

const CATEGORY_NAMES: Record<string, string> = {
  "womans-fashion": "Woman's Fashion",
  "mens-fashion": "Men's Fashion",
  electronics: "Electronics",
  "home-lifestyle": "Home & Lifestyle",
  medicine: "Medicine",
  "sports-outdoor": "Sports & Outdoor",
  "babys-toys": "Baby's & Toys",
  "groceries-pets": "Groceries & Pets",
  "health-beauty": "Health & Beauty",
  phones: "Phones",
  computers: "Computers",
  smartwatch: "SmartWatch",
  camera: "Camera",
  headphones: "HeadPhones",
  gaming: "Gaming",
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName =
    CATEGORY_NAMES[slug || ""] || slug?.replace("-", " ") || "Products";

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const isSubCategory = [
          "phones",
          "computers",
          "smartwatch",
          "camera",
          "headphones",
          "gaming",
        ].includes(slug);

        const data = isSubCategory
          ? await getProductsBySubCategory(categoryName)
          : await getProductsByCategory(categoryName);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug, categoryName]);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-muted hover:text-dark transition-colors">
            Home
          </Link>
          <span className="text-muted">/</span>
          <span className="text-dark uppercase">{categoryName}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-5 h-10 bg-primary rounded"></div>{" "}
          <h2 className="text-3xl font-heading font-bold text-dark">
            Explore {categoryName} products
          </h2>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.product_id}
                image={product.image}
                title={product.title}
                price={product.price}
                oldPrice={product.old_price}
                discount={product.discount}
                rating={product.rating}
                reviewsCount={product.reviews_count}
                badgeType={product.badge_type}
                colors={product.colors}
                showColors={!!product.colors && product.colors.length > 0}
                description={product.description}
                images={product.images}
                inStock={product.in_stock}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
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
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-semibold text-dark mb-2">
              No Products Found
            </h2>
            <p className="text-muted mb-6">
              We couldn't find any products in this category yet.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
