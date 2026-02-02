import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/stores/useLanguageStore";
import HeroImage from "/images/hero.png";
import AppleLogo from "/images/Apple_logo.png";
import ShopArrow from "/images/Vector-2.png";
import RoundedArrow from "/images/Ellipse-7.png";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const [index, setIndex] = useState(0);
  const slidesCount = 5;
  const dotsCount = 5;
  const isRTL = language === "ar";

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slidesCount);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  return (
    <section className="relative w-full lg:w-[892px] h-[250px] sm:h-[300px] lg:h-[344px] overflow-hidden bg-black rounded-lg">
      {/* SLIDER TRACK */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(${isRTL ? "" : "-"}${index * 100}%)` }}
      >
        {[...Array(slidesCount)].map((_, i) => (
          <div
            key={i}
            className="relative w-full lg:w-[892px] h-full flex-shrink-0"
          >
            {/* LEFT CONTENT */}
            <div className="absolute top-[30px] sm:top-[40px] lg:top-[60px] start-[24px] sm:start-[40px] lg:start-[64px] text-white z-10">
              {/* Logo + text */}
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-3 lg:mb-5">
                <img
                  src={AppleLogo}
                  alt="Apple"
                  className="w-6 h-7 sm:w-8 sm:h-10 lg:w-10 lg:h-12"
                />
                <span className="text-xs sm:text-sm lg:text-[16px] font-normal text-[#FAFAFA]">
                  {t("hero.iphone14")}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-[48px] text-[#FAFAFA] font-semibold leading-tight lg:leading-[60px] mb-4 lg:mb-6">
                {t("hero.title")} <br /> {t("hero.subtitle")}
              </h2>

              {/* Shop now */}
              <div
                className="flex items-center gap-2 cursor-pointer group w-fit"
                onClick={() => navigate("/product/iphone-14-pro-max")}
              >
                <span className="relative text-sm lg:text-[16px] font-medium">
                  {t("hero.shopNow")}
                  <span className="absolute start-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </span>
                <img
                  src={ShopArrow}
                  alt="Shop Arrow"
                  className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
                />
              </div>
            </div>

            {/* PHONE IMAGE */}
            <img
              src={HeroImage}
              alt="Hero Phone"
              className={`absolute top-[8px] sm:top-[12px] lg:top-[16px] ${isRTL ? "start-[-20px] sm:start-[-30px] lg:left-[-32px]" : "end-[-20px] sm:end-[-30px] lg:right-[-32px]"} w-[280px] sm:w-[380px] lg:w-[496px] h-auto object-contain`}
            />
          </div>
        ))}
      </div>

      {/* DOTS */}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {[...Array(dotsCount)].map((_, i) => (
          <img
            key={i}
            src={RoundedArrow}
            alt="dot"
            className={`w-3 h-3 transition-all duration-500 ease-out ${
              i === index ? "scale-125 opacity-100" : "scale-100 opacity-50"
            }`}
            style={{
              filter: i === index ? "none" : "grayscale(100%)",
              backgroundColor: "#DB4444",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
