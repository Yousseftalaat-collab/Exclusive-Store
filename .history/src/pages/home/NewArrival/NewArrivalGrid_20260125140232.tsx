import { useNavigate } from "react-router-dom";
import PS5Image from "/assets/images/Ps5.png";
import SpeakersImage from "/assets/images/Speaker.png";
import PerfumeImage from "/assets/images/Perfume.png";

const NewArrivalGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-[570px_570px] gap-6">
      <div className="row-span-2 relative w-[570px] h-[600px] bg-black rounded-[4px] overflow-hidden group cursor-pointer">
        <img
          src={PS5Image}
          alt="PlayStation 5"
          className="absolute inset-0 w-[510px] h-[510px] object-cover justify-self-center self-center ml-0 mt-24 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-8 left-8 z-10 max-w-[280px]">
          <h3 className="text-[24px] font-semibold text-white mb-2">
            PlayStation 5
          </h3>
          <p className="text-[14px] text-gray-300 mb-4">
            Black and White version of the PS5 coming out on sale.
          </p>

          <span
            className="text-white text-[14px] font-medium underline underline-offset-4 cursor-pointer transition-opacity hover:opacity-70"
            onClick={() => navigate("/product/new-ps5-console")}
          >
            Shop Now
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative h-[284px] bg-black rounded-[4px] p-8 flex flex-col justify-end cursor-pointer">
          <h3 className="text-[24px] font-semibold text-white mb-2">
            Women's Collections
          </h3>
          <p className="text-[14px] text-gray-300 mb-4 max-w-[300px]">
            Featured woman collections that <br />
            give you another vibe.
          </p>

          <span
            className="text-white text-[14px] underline underline-offset-4 cursor-pointer hover:opacity-70 transition"
            onClick={() => navigate("/product/best-jacket-1")}
          >
            Shop Now
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative h-[290px] bg-black rounded-[4px] overflow-hidden p-6 cursor-pointer group">
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.2) 100%, rgba(255,255,255,0.2) 100%, transparent 70%)",
              }}
            />

            <img
              src={SpeakersImage}
              alt="Speakers"
              className="absolute top-[31px]  left-0 right-0 mx-auto w-[210px] h-[222px] object-contain z-0 transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute z-10 bottom-8 left-8">
              <h3 className="text-[24px] font-semibold text-white mb-2">
                Speakers
              </h3>
              <p className="text-[14px] text-gray-300 mb-4">
                Amazon wireless speakers
              </p>

              <span
                className="text-white text-[14px] underline underline-offset-4 cursor-pointer hover:opacity-70 transition"
                onClick={() => navigate("/product/new-speakers")}
              >
                Shop Now
              </span>
            </div>
          </div>

          <div className="relative h-[290px] bg-black rounded-[4px] overflow-hidden p-6 cursor-pointer group">
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.2) 100%, rgba(255,255,255,0.2) 100%, transparent 70%)",
              }}
            />

            <img
              src={PerfumeImage}
              alt="Perfume"
              className="absolute top-[31px]  left-0 right-0 mx-auto w-[210px] h-[222px] object-contain z-0 transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute z-10 bottom-8 left-8">
              <h3 className="text-[24px] font-semibold text-white mb-2">
                Perfume
              </h3>
              <p className="text-[14px] text-gray-300 mb-4">
                GUCCI INTENSE OUD EDP
              </p>

              <span
                className="text-white text-[14px] underline underline-offset-4 cursor-pointer hover:opacity-70 transition"
                onClick={() => navigate("/product/new-perfume")}
              >
                Shop Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalGrid;
