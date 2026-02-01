import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreProductsHeader from "./ExploreProductsHeader";
import ExploreProductsGrid from "./ExploreProductsGrid";
import Button from "@/components/ui/Button";

import { products } from "./products";

const ITEMS_PER_PAGE = 8; // 4 per row (or 8 total if you want 2 rows)
const TOTAL_PAGES = Math.ceil(products.length / ITEMS_PER_PAGE);

const ExploreProductsSection = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(0);

  const handleNext = () => {
    setActivePage((prev) => (prev < TOTAL_PAGES - 1 ? prev + 1 : 0)); // loop back to first page
  };

  const handlePrev = () => {
    setActivePage((prev) => (prev > 0 ? prev - 1 : TOTAL_PAGES - 1)); // loop to last page
  };

  // slice products for current page
  const currentProducts = products.slice(
    activePage * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  return (
    <section className="w-[1308px] mx-auto flex flex-col gap-10">
      {" "}
      {/* HEADER */}
      <ExploreProductsHeader onNext={handleNext} onPrev={handlePrev} />
      {/* PRODUCTS GRID */}
      <ExploreProductsGrid products={currentProducts} />
      {/* VIEW ALL BUTTON */}
      <div className="flex justify-center mt-10 mr-36">
        <Button
          variant="primary"
          className="w-[234px] h-[56px] text-white transition hover:scale-105"
          onClick={() => navigate("/our-products")}
        >
          View All Products
        </Button>
      </div>
    </section>
  );
};

export default ExploreProductsSection;
