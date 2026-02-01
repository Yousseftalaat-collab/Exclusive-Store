import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, H2 } from "@/components/ui/Typography";

const FLASH_SALE_DURATION = 4 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "flashSaleEndTime";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getEndTime = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const endTime = Number(saved);
    if (!isNaN(endTime) && endTime > Date.now()) {
      return endTime;
    }
  }

  const newEndTime = Date.now() + FLASH_SALE_DURATION;
  localStorage.setItem(STORAGE_KEY, String(newEndTime));
  return newEndTime;
};

const calculateTimeLeft = (endTime: number): TimeLeft => {
  const diff = endTime - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const FlashSalesTimer = () => {
  const { t } = useTranslation();

  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const storedEndTime = getEndTime(); // always a number
    setEndTime(storedEndTime); // safe
    setTimeLeft(calculateTimeLeft(storedEndTime));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(storedEndTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!endTime) return null;

  return (
    <div className="w-[302px] h-[50px] flex items-center gap-4">
      <TimeItem label={t("flashSales.days")} value={timeLeft.days} />
      <Separator />
      <TimeItem label={t("flashSales.hours")} value={timeLeft.hours} />
      <Separator />
      <TimeItem label={t("flashSales.minutes")} value={timeLeft.minutes} />
      <Separator />
      <TimeItem label={t("flashSales.seconds")} value={timeLeft.seconds} />
    </div>
  );
};

export default FlashSalesTimer;

const TimeItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex flex-col items-center min-w-[50px]">
      <Text className="text-[12px] font-medium font-poppins text-black">
        {label}
      </Text>

      <H2 className="text-[32px] font-bold font-inter text-black leading-none">
        {String(value).padStart(2, "0")}
      </H2>
    </div>
  );
};

const Separator = () => (
  <Text className="text-[32px] font-semibold text-[#DB4444] leading-none">
    :
  </Text>
);
