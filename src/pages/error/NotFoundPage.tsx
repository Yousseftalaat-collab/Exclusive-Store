import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-24 ml-12 mt-[-120px]">
          <Link to="/" className="text-muted hover:text-dark transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-muted">/</span>
          <span className="text-dark">{t("error.title")}</span>
        </div>

        {/* Error Content */}
        <div className="text-center max-w-xl mx-auto">
          <div className="flex justify-center">
            <h2 className="whitespace-nowrap text-8xl md:text-9xl font-heading font-semibold text-dark mb-8">
              {t("error.404")}
            </h2>
          </div>
          <p className="text-lg text-dark mb-12">{t("error.pageNotFound")}</p>
          <Link to="/">
            <Button variant="primary" className="px-12 py-4 w-[255px] h-[55px]">
              {t("error.backToHome")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
