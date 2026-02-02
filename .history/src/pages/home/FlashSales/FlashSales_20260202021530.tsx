import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashSalesHeader from "./FlashSalesHeader";
import FlashSalesList from "./FlashSalesList";
import Button from "@/components/ui/Button";
import Chair from "/images/Chair.png";
import TV from "/images/TV.png";
import Keyboard from "/images/Keyboard.png";
import Controllar from "/images/Controllar.png";
import Car from "/images/Toy-Car.png";
import Gamepad from "/images/Playstation-Arm.png";
import Line from "/images/Line.png";

const FlashSales = () => {
  const navigate = useNavigate();

  // ----------------------------
  // MOCK DATA (replace later)
  // ----------------------------
  const products = [
    {
      id: "flash-gamepad-1",
      image: Controllar,
      title: "HAVIT HV-G92 Gamepad",
      price: 120,
      oldPrice: 160,
      discount: 40,
      rating: 5,
      reviewsCount: 88,
    },
    {
      id: "flash-keyboard-1",
      image: Keyboard,
      title: "AK-900 Wired Keyboard",
      price: 960,
      oldPrice: 1160,
      discount: 35,
      rating: 4,
      reviewsCount: 75,
    },
    {
      id: "ips-lcd-gaming-screen",
      image: TV,
      title: "IPS LCD Gaming Monitor",
      price: 370,
      oldPrice: 400,
      discount: 30,
      rating: 5,
      reviewsCount: 99,
    },
    {
      id: "flash-chair-1",
      image: Chair,
      title: "S-Series Comfort Chair",
      price: 375,
      oldPrice: 400,
      discount: 25,
      rating: 4.5,
      reviewsCount: 99,
    },
    {
      id: "kids-electric-car",
      image: Car,
      title: "Kids Electric Car",
      price: 960,
      oldPrice: 1200,
      discount: 25,
      rating: 4.5,
      reviewsCount: 99,
    },
    {
      id: "featured-gamepad-2",
      image: Gamepad,
      title: "GP11 Shooter USB Gamepad",
      price: 660,
      oldPrice: 720,
      discount: 25,
      rating: 4.5,
      reviewsCount: 99,
    },
  ];

  // ----------------------------
  // SLIDER STATE
  // ----------------------------
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = products.length - 4; // 4 cards fully visible

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="w-[1308px] mx-auto flex flex-col gap-10">
      {/* HEADER */}
      <FlashSalesHeader onNext={handleNext} onPrev={handlePrev} />

      {/* PRODUCTS */}
      <FlashSalesList products={products} currentIndex={currentIndex} />

      {/* VIEW ALL BUTTON */}
      <div className="flex justify-center mt-10 mr-36 mb-10">
        <Button
          variant="primary"
          className="w-[234px] h-[56px] cursor-pointer text-white transition-colors duration-300 hover:scale-110"
          onClick={() => navigate("/flash-sales")}
        >
          View All Products
        </Button>
      </div>

      <div className="flex justify-center">
        <img
          src={Line}
          alt="divider line"
          className="w-[1170px] h-[2px] bg-gray-300 mr-[120px] mb-[20px]"
        />
      </div>
    </section>
  );
};

export default FlashSales;
