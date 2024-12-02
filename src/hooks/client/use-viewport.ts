import { useEffect, useState } from 'react';
import eventOnMount from '@/hooks/events/event-on-mount';

type ViewportProps = {
  isMobile: boolean;
  isTablet: boolean;
  isMdScreen: boolean;
  isLgScreen: boolean;
  isXlScreen: boolean;
  isXxlScreen: boolean;
};

const useViewport = (): ViewportProps => {
  const [width, setWidth] = useState(3000);

  useEffect(() => {
    setWidth(window.innerWidth);
    eventOnMount('resize', () => setWidth(window.innerWidth));
  }, [width]);

  return {
    isMobile: width <= 480,
    isTablet: width <= 768,
    isMdScreen: width <= 992,
    isLgScreen: width <= 1200,
    isXlScreen: width <= 1400,
    isXxlScreen: width <= 1600,
  };
};

export default useViewport;
