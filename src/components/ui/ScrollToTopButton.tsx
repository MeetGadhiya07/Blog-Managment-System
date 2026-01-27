import { ChevronsUp } from 'lucide-react';

const ScrollToTopButton = ({ animateButton }: { animateButton: boolean }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`group rounded-l-10 bg-primary hover:bg-primaryHover fixed right-0 bottom-16 z-50 grid h-12 w-9 place-content-center border-4 border-r-0 text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
        animateButton ? 'animate-bounce' : ''
      }`}
      aria-label="Scroll to top"
    >
      <ChevronsUp
        size={24}
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </button>
  );
};

export default ScrollToTopButton;
