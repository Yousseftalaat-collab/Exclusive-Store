import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropDownCatogries from "/images/DropDownCatogries.png";

type Category = {
  labelKey: string;
  slug: string;
  hasDropdown?: boolean;
};

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      labelKey: "categories.womans",
      slug: "womans-fashion",
      hasDropdown: true,
    },
    { labelKey: "categories.mens", slug: "mens-fashion", hasDropdown: true },
    { labelKey: "categories.electronics", slug: "electronics" },
    { labelKey: "categories.homeLifestyle", slug: "home-lifestyle" },
    { labelKey: "categories.medicine", slug: "medicine" },
    { labelKey: "categories.sports", slug: "sports-outdoor" },
    { labelKey: "categories.babys", slug: "babys-toys" },
    { labelKey: "categories.groceries", slug: "groceries-pets" },
    { labelKey: "categories.health", slug: "health-beauty" },
  ];

  const toggleCategory = (labelKey: string) => {
    setOpenCategory((prev) => (prev === labelKey ? null : labelKey));
  };

  return (
    <aside className="w-[300px] h-[388px] border-e border-gray-300">
      <div className="pr-6">
        <div className="flex flex-col pt-10 space-y-4">
          {categories.map((cat) => (
            <div key={cat.labelKey}>
              {/* Category Row */}
              <Link
                to={`/category/${cat.slug}`}
                className="grid grid-cols-[1fr_40px] items-center cursor-pointer
             text-[16px] font-normal text-dark hover:text-primary"
                onClick={(e) => {
                  if (cat.hasDropdown) {
                    e.preventDefault();
                    toggleCategory(cat.labelKey);
                  }
                }}
              >
                <span className="whitespace-nowrap">{t(cat.labelKey)}</span>

                {cat.hasDropdown && (
                  <img
                    src={DropDownCatogries}
                    alt="dropdown"
                    className={`w-5 h-5 justify-self-end transition-transform duration-300 ${
                      openCategory === cat.labelKey ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {cat.hasDropdown && openCategory === cat.labelKey && (
                <Link
                  to={`/category/${cat.slug}`}
                  className="block mt-2 ms-3 text-[15px] text-gray-600 cursor-pointer hover:text-primary"
                >
                  {t("common.all")}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Categories;
