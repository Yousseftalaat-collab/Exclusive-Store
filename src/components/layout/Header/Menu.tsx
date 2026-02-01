import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const Menu: React.FC = () => {
  const { t } = useTranslation();

  const menuItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.contact"), path: "/contact" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.signUp"), path: "/register" },
  ];

  return (
    <nav className="flex items-center gap-12">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              "relative font-body text-base font-normal text-dark  whitespace-nowrap",
              "after:absolute after:start-0 after:-bottom-1",
              "after:h-[2px] after:w-0 after:bg-muted",
              "after:transition-all after:duration-300",
              "hover:after:w-full",
              isActive ? "text-dark" : "text-dark",
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Menu;
