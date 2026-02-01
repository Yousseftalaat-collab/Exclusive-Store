import { useTranslation } from "react-i18next";
import { Text, H2 } from "@/components/ui/Typography";
import TitleImage from "/assets/icons/Rectangle-18.png";
import RightArrow from "/assets/icons/icons-arrow-right.png";
import LeftArrow from "/assets/icons/icons-arrow-left.png";

type CategoriesHeaderProps = {
  onNext: () => void;
  onPrev: () => void;
};

const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({
  onNext,
  onPrev,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-start">
      {/* LEFT */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-6">
          <img src={TitleImage} alt="decoration" className="h-10 w-5" />
          <Text className="text-[16px] font-semibold text-[#DB4444] font-poppins pl-3">
            {t("categories.title")}
          </Text>
        </div>

        <H2 className="text-[36px] font-semibold font-inter text-black">
          {t("categories.browseByCategory")}
        </H2>
      </div>

      {/* RIGHT - ARROWS */}
      <div className="flex gap-4 mt-16 me-32">
        <button
          onClick={onPrev}
          className="w-12 h-12 rounded-full border border-gray-300
          flex items-center justify-center bg-gray-200
          hover:bg-[#DB4444] transition hover:scale-125"
        >
          <img src={LeftArrow} alt="left" className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          className="w-12 h-12 rounded-full border border-gray-300
          flex items-center justify-center bg-gray-200
          hover:bg-[#DB4444] transition hover:scale-125"
        >
          <img src={RightArrow} alt="right" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CategoriesHeader;
