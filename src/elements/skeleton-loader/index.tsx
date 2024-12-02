'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

const SkeletonLoader = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shimmerStyle = useSpring({
    from: { opacity: 0.5 },
    to: { opacity: 1 },
    config: { duration: 1000 },
    loop: { reverse: true },
    pause: !isMounted,
  });

  return (
    <div className="skeleton-loader-container">
      <animated.div className="skeleton-body" style={shimmerStyle} />
    </div>
  );
};

export default SkeletonLoader;
