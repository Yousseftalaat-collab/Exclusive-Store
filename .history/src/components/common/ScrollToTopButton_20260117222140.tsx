import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ArrowUp from "/assets/icons/arrow-up.png";

interface ScrollToTopButtonProps {
  sectionRef?: React.RefObject<HTMLDivElement | null>;
}

const ScrollToTopButton = ({ sectionRef }: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (sectionRef?.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;

        const scrollPosition = window.scrollY + window.innerHeight;
        const sectionBottom = sectionTop + sectionHeight;

        if (
          window.scrollY >= sectionTop - window.innerHeight / 2 ||
          scrollPosition >= sectionBottom
        ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        if (window.scrollY > 600) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [sectionRef]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return createPortal(
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-10 right-10 z-[9999] !important
        w-12 h-12 rounded-full
        border border-gray-300
        flex items-center justify-center
        bg-white shadow-lg
        hover:bg-[#DB4444] hover:border-[#DB4444]
        transition-all duration-300
        hover:scale-110
        active:scale-95
      "
      style={{ position: "fixed" }}
      aria-label="Scroll to top"
    >
      <img src={ArrowUp} alt="scroll to top" className="w-6 h-6" />
    </button>,
    document.body
  );
};

export default ScrollToTopButton;
