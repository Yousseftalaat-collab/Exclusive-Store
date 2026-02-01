interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="w-[250px] h-[165px] flex flex-col items-center gap-6 text-center">
      {/* ICON */}
      <div className="w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center">
        <img src={image} alt={title} />
      </div>

      {/* TEXT */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[20px] font-poppins font-semibold text-black uppercase whitespace-nowrap">
          {title}
        </h3>
        <p className="text-[14px] font-poppins font-normal text-black">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
