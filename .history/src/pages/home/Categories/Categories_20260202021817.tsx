import { useState } from "react";
import { useTranslation } from "react-i18next";

import CategoriesHeader from "./CategoriesHeader";
import CategoriesList from "./CategoriesList";
import Line from "/images/Line.png";

import PhoneIcon from "/images/CellPhone.png";
import ComputerIcon from "/images/Computer.png";
import WatchIcon from "/images/SmartWatch.png";
import CameraIcon from "/images/Camera.png";
import HeadphoneIcon from "/images/HeadPhone.png";
import GameIcon from "/images/Gamepad.png";

const CategoriesSection = () => {
  const { t } = useTranslation();

  const categories = [
    { id: 1, icon: PhoneIcon, label: t("categories.phones"), slug: "phones" },
    {
      id: 2,
      icon: ComputerIcon,
      label: t("categories.computers"),
      slug: "computers",
    },
    {
      id: 3,
      icon: WatchIcon,
      label: t("categories.smartwatch"),
      slug: "smartwatch",
    },
    { id: 4, icon: CameraIcon, label: t("categories.camera"), slug: "camera" },
    {
      id: 5,
      icon: HeadphoneIcon,
      label: t("categories.headphones"),
      slug: "headphones",
    },
    { id: 6, icon: GameIcon, label: t("categories.gaming"), slug: "gaming" },
  ];

  const [activeIndex, setActiveIndex] = useState(3);

  const handleNext = () => {
    setActiveIndex((prev) => (prev < categories.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section className="w-[1308px] mx-auto flex flex-col gap-12">
      <CategoriesHeader onNext={handleNext} onPrev={handlePrev} />

      <CategoriesList categories={categories} activeIndex={activeIndex} />

      <div className="flex justify-center pt-16">
        <img
          src={Line}
          alt="divider"
          className="w-[1170px] h-[2px] bg-gray-300 me-[120px] mb-[20px]"
        />
      </div>
    </section>
  );
};

export default CategoriesSection;
