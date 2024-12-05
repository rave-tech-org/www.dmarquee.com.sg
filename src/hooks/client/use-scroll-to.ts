import { animate } from 'framer-motion';

const useScrollTo = () => {
  const scrollTo = (id: string, extraTop: number = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const targetY = element.offsetTop - extraTop;
      animate(window.scrollY, targetY, {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        onUpdate: (value) => window.scrollTo(0, value),
      });
    }
  };

  return { scrollTo };
};

export default useScrollTo;
