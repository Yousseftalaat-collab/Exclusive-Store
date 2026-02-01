import ProductCard from "@/components/common/ProductCard";

type Product = {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
};

type FlashSalesListProps = {
  products: Product[];
  currentIndex: number;
};

const CARD_WIDTH = 270;
const CARD_GAP = 30;
const SLIDE_STEP = CARD_WIDTH + CARD_GAP;

const FlashSalesList: React.FC<FlashSalesListProps> = ({
  products,
  currentIndex,
}) => {
  return (
    <div className="relative w-full max-w-[1308px] overflow-hidden">
      {/* Desktop: Horizontal scroll slider */}
      <div className="hidden lg:block">
        <div
          className="flex gap-[30px] transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(-${currentIndex * SLIDE_STEP}px)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="shrink-0">
              <ProductCard {...product} id={String(product.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard {...product} id={String(product.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSalesList;
