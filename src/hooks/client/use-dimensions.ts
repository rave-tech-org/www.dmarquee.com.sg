import { useState, useEffect, MutableRefObject } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

const useDimensions = (ref: MutableRefObject<HTMLElement | null>): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries) || !entries.length) return;
      const entry = entries[0];
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    };

    const observer = new ResizeObserver((entries) => {
      handleResize(entries);
    });

    observer.observe(ref.current);

    setDimensions({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
};

export default useDimensions;
