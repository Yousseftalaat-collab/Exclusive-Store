import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Text, H2 } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import TitleImage from "/assets/icons/Rectangle-18.png";

const BestSellingHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-start">
      {/* LEFT SIDE */}
      <div className="flex gap-10 items-start">
        {/* TITLES */}
        <div className="flex flex-col gap-3">
          {/* Today's line */}
          <div className="flex items-center gap-2 pb-6">
            <img src={TitleImage} alt="title decoration" className="h-10 w-5" />
            <Text className="text-[16px] font-semibold text-[#DB4444] font-poppins pl-3">
              {t("bestSelling.subtitle")}
            </Text>
          </div>
          <H2 className="text-[36px] font-semibold font-inter text-black pr-16">
            {t("bestSelling.title")}{" "}
          </H2>
        </div>
      </div>

      {/* RIGHT */}
      <Button
        variant="primary"
        className="w-[159px] h-[56px] mt-16 me-32 transition-colors duration-300 hover:scale-110"
        onClick={() => navigate("/best-selling")}
      >
        View All
      </Button>
    </div>
  );
};

export default BestSellingHeader;
