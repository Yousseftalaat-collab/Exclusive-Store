import NewArrivalHeader from "./NewArrivalHeader";
import NewArrivalGrid from "./NewArrivalGrid";

const NewArrivalSection = () => {
  return (
    <section className="w-full max-w-[1308px] mx-auto flex flex-col gap-10 px-4">
      {/* HEADER */}
      <NewArrivalHeader />

      {/* PRODUCTS GRID */}
      <NewArrivalGrid />
    </section>
  );
};

export default NewArrivalSection;
