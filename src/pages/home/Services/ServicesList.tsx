import { useTranslation } from "react-i18next";
import ServiceCard from "./ServiceCard";
import DeliveryIcon from "/assets/icons/Delviery-icon.png";
import SupportIcon from "/assets/icons/Support-icon.png";
import GuaranteeIcon from "/assets/icons/guarante-icon.png";

const ServicesList = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between gap-[90px]">
      <ServiceCard
        image={DeliveryIcon}
        title={t("services.freeDelivery.title")}
        description={t("services.freeDelivery.description")}
      />

      <ServiceCard
        image={SupportIcon}
        title={t("services.customerService.title")}
        description={t("services.customerService.description")}
      />

      <ServiceCard
        image={GuaranteeIcon}
        title={t("services.moneyBack.title")}
        description={t("services.moneyBack.description")}
      />
    </div>
  );
};

export default ServicesList;
