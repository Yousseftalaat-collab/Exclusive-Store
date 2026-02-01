import ProductCard from "@/components/common/ProductCard";
import { products as ProductsArray } from "./products";

type Props = {
  products: typeof ProductsArray;
};
const ExploreProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-[repeat(4,270px)] gap-x-8 gap-y-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          id={String(product.id)}
          layout="compact"
          showColors={Boolean(product.colors)}
          badgeType={product.isNew ? "new" : undefined}
        />
      ))}
    </div>
  );
};

export default ExploreProductsGrid;
