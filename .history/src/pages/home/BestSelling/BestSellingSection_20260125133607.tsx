import BestSellingHeader from "./BestSellingHeader";
import BestSellingList from "./BestSellingList";

import Jacket from "/assets/images/Jacket.png";
import Bag from "/assets/images/Bag.png";
import Sound from "/assets/images/Sound.png";
import BookSelf from "/assets/images/BookSelf.png";

const BestSellingSection = () => {
  const products = [
    {
      id: "best-jacket-1",
      image: Jacket,
      title: "The north coat",
      price: 260,
      oldPrice: 360,
      rating: 5,
      reviewsCount: 65,
    },
    {
      id: "best-bag-1",
      image: Bag,
      title: "Gucci duffle bag",
      price: 960,
      oldPrice: 1160,
      rating: 4.5,
      reviewsCount: 65,
    },
    {
      id: "rgb-liquid-cpu-cooler",
      image: Sound,
      title: "RGB liquid CPU Cooler",
      price: 160,
      oldPrice: 170,
      rating: 4.5,
      reviewsCount: 65,
    },
    {
      id: "best-bookshelf-1",
      image: BookSelf,
      title: "Small BookSelf",
      price: 360,
      rating: 5,
      reviewsCount: 65,
    },
  ];

  return (
    <section className="w-[1308px] mx-auto flex flex-col gap-10">
      <BestSellingHeader />
      <BestSellingList products={products} />
    </section>
  );
};

export default BestSellingSection;
