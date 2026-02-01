import ProductCard from "@/components/common/ProductCard";

type Product = {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
};

type Props = {
  products: Product[];
};

const BestSellingList: React.FC<Props> = ({ products }) => {
  return (
    <div className="flex gap-[30px]">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} id={String(product.id)} />
      ))}
    </div>
  );
};

export default BestSellingList;
