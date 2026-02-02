import { useTranslation } from "react-i18next";
import { Text, H2 } from "@/components/ui/Typography";
import TitleImage from "/icons/Rectangle-18.png";

const NewArrivalHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start">
      {/* TITLES */}
      <div className="flex flex-col gap-3">
        {/* Featured tag */}
        <div className="flex items-center gap-2 pb-6">
          <img src={TitleImage} alt="title decoration" className="h-10 w-5" />
          <Text className="text-[16px] font-semibold text-[#DB4444] font-poppins ps-3">
            {t("newArrival.subtitle")}
          </Text>
        </div>
        <H2 className="text-[36px] font-semibold font-inter text-black pe-16">
          {t("newArrival.title")}
        </H2>
      </div>
    </div>
  );
};

export default NewArrivalHeader;
