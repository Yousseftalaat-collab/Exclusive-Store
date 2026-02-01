import { useNavigate } from "react-router-dom";

type CategoryCardProps = {
  icon: string;
  label: string;
  slug: string;
  isActive?: boolean;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  label,
  slug,
  isActive = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group w-[170px] h-[145px] flex flex-col items-center justify-center gap-4
      rounded border cursor-pointer transition-all duration-300
      ${
        isActive
          ? "bg-[#DB4444] text-white border-[#DB4444]"
          : "bg-white border-gray-300 hover:bg-[#DB4444] hover:text-white"
      }`}
    >
      <img
        src={icon}
        alt={label}
        className={`w-14 h-14 transition duration-300
            ${
              isActive
                ? "filter invert brightness-0"
                : "filter brightness-0 group-hover:invert group-hover:brightness-0"
            }`}
      />

      <p className="text-[16px] font-medium font-poppins">{label}</p>
    </div>
  );
};

export default CategoryCard;
