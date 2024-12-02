import { useCallback, useEffect, useState } from 'react';
import eventOnMount from '@/hooks/events/event-on-mount';

const useStickyByScroll = (menuHeight: number): boolean => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > menuHeight) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [menuHeight]);

  useEffect(() => {
    eventOnMount('scroll', handleScroll);
  }, [handleScroll]);

  return isSticky;
};

export default useStickyByScroll;
