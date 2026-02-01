import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const TopHeader: React.FC = () => {
  const { t } = useTranslation();
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  const languages = [
    { code: "en" as const, name: "English", nativeName: "English" },
    { code: "ar" as const, name: "Arabic", nativeName: "العربية" },
    { code: "es" as const, name: "Spanish", nativeName: "Español" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setLanguageOpen(false);
    if (languageOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [languageOpen]);

  return (
    <div className="w-full h-12 bg-black dark:bg-gray-900 text-white flex items-center relative transition-colors">
      {/* Center Text */}
      <p className="absolute left-1/2 -translate-x-1/2 text-sm font-normal font-poppins hidden md:block">
        {t("topHeader.sale")}{" "}
        <Link
          to="/our-products"
          className="underline font-medium hover:text-primary transition-colors"
        >
          {t("topHeader.shopNow")}
        </Link>
      </p>

      <div className="absolute right-4 md:right-24 flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLanguageOpen(!languageOpen);
            }}
            className="flex items-center gap-1 text-sm font-poppins hover:text-primary transition-colors"
          >
            {currentLanguage.nativeName}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                languageOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {languageOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 text-dark dark:text-white rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
              <ul className="py-2">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLanguage(lang.code);
                        setLanguageOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === lang.code
                          ? "bg-primary/10 text-primary font-medium"
                          : ""
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
