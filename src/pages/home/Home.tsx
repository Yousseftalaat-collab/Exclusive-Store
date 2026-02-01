import { useRef } from "react";
import Categories from "./HeroSection/Categories";
import Hero from "./HeroSection/Hero";
import FlashSales from "./FlashSales/FlashSales";
import CategoriesSection from "./Categories/Categories";
import BestSellingSection from "./BestSelling/BestSellingSection";
import FeaturedCampaign from "./FeaturedCampaign/FeaturedCampaign";
import ExploreProductsSection from "./ExploreProducts/ExploreProductsSection";
import NewArrivalSection from "./NewArrival/NewArrivalSection";
import ServicesSection from "./Services/ServicesSection";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const Home: React.FC = () => {
  const servicesSectionRef = useRef<HTMLDivElement>(null);

  return (
    <main className="max-w-[1770px] mx-auto px-24">
      <div className="flex ">
        <Categories />
        <div className="ml-20 pb-10 mt-10">
          <Hero />
        </div>
      </div>
      {/* Flash Sales below Hero */}
      <div className="mt-24">
        <FlashSales />
      </div>

      <div className="mt-24">
        <CategoriesSection />
      </div>

      <div className="mt-24">
        <BestSellingSection />
      </div>
      <div className="mt-24">
        <FeaturedCampaign />
      </div>

      <div id="explore-products" className="mt-24">
        <ExploreProductsSection />
      </div>

      <div className="mt-24">
        <NewArrivalSection />
      </div>

      <div ref={servicesSectionRef} className="mt-24 mb-24">
        <ServicesSection />
      </div>

      <ScrollToTopButton sectionRef={servicesSectionRef} />
    </main>
  );
};

export default Home;
