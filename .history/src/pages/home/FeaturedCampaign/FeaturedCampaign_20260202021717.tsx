import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/stores/useLanguageStore";
import SpeakerImage from "/images/JBL.png";
import { H2 } from "@/components/ui/Typography";

const TARGET_DATE = new Date().getTime() + 6 * 24 * 60 * 60 * 1000;

const FeaturedCampaign: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const isRTL = language === "ar";
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  return (
    <section className="relative w-[1170px] h-[500px] bg-black mx-auto overflow-hidden">
      <div
        className={`flex h-full items-center justify-between px-16 relative z-10 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* LEFT CONTENT */}
        <div className="max-w-[440px]">
          {/* Category Label */}
          <p className="text-[16px] font-semibold text-[#00FF66] mb-6">
            {t("jbl.categories")}
          </p>

          {/* Heading */}
          <H2 className="text-[48px] font-semibold leading-[60px] text-[#FAFAFA] mb-8">
            {t("jbl.title")} <br /> {t("jbl.subtitle")}
          </H2>

          {/* Timer */}
          <div className="flex gap-6 mb-10">
            {[
              { label: t("jbl.hours"), value: timeLeft.hours },
              { label: t("jbl.days"), value: timeLeft.days },
              { label: t("jbl.minutes"), value: timeLeft.minutes },
              { label: t("jbl.seconds"), value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="w-[62px] h-[62px] bg-white rounded-full flex flex-col items-center justify-center"
              >
                <span className="text-[16px] font-semibold text-black leading-none">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-black">{item.label}</span>
              </div>
            ))}
          </div>

          <button
            className="w-[171px] h-[56px] bg-[#00FF66] text-[#FAFAFA] text-[16px] font-semibold rounded hover:bg-[#00CC55] transition-colors hover:scale-110"
            onClick={() => navigate("/product/jbl-boombox-3")}
          >
            {t("jbl.buyNow")}
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className={`relative flex items-center justify-center ${isRTL ? "pl-10" : "pr-10"}`}
        >
          {/* Strong Radial Glow */}
          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none`}
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 45%, transparent 75%)",
              filter: "blur(120px)",
            }}
          />

          {/* Floating Image */}
          <img
            src={SpeakerImage}
            alt="Featured Speaker"
            className={`relative w-[568px] h-[330px] object-contain z-10 ${isRTL ? "-translate-x-16" : "translate-x-16"}`}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaign;
