import { motion } from "framer-motion";

interface LoadingLogoProps {
  size?: "sm" | "md" | "lg";
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ size = "md" }) => {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  return (
    <div className={`${sizes[size]} relative flex items-center justify-center`}>
      {/* Animated Circle */}
      <motion.div
        className="absolute inset-0 border-4 border-primary rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.3, 1, 0.3],
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Circle */}
      <motion.div
        className="absolute inset-2 border-2 border-primary/50 rounded-full"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.5, 0.2, 0.5],
          rotate: -360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ES Text */}
      <motion.div
        className={`${textSizes[size]} font-bold text-primary font-heading`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ES
      </motion.div>
    </div>
  );
};

export default LoadingLogo;
