import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFlashSaleProducts } from "../../services/productsService";
import type { Product } from "../../services/productsService";
import ProductCard from "../../components/common/ProductCard";

export default function FlashSalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getFlashSaleProducts();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-muted hover:text-dark transition-colors">
            Home
          </Link>
          <span className="text-muted">/</span>
          <span className="text-dark">FLASH SALE</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Header with Timer */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-5 h-10 bg-primary rounded"></div>
            <h2 className="text-4xl font-heading font-bold text-dark">
              Explore Flash Sale Products
            </h2>
          </div>
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
                badgeType="discount"
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
            <h2 className="text-2xl font-heading font-semibold text-dark mb-2">
              No Flash Sales Active
            </h2>
            <p className="text-muted mb-6">
              Check back later for amazing deals!
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
