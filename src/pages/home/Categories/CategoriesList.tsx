import CategoryCard from "./CategoryCard";

type Category = {
  id: number;
  icon: string;
  label: string;
  slug: string;
};

type CategoriesListProps = {
  categories: Category[];
  activeIndex: number;
};

const CategoriesList: React.FC<CategoriesListProps> = ({
  categories,
  activeIndex,
}) => {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-8 transition-transform duration-500">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            label={category.label}
            slug={category.slug}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
