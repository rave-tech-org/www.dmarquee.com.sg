'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { AnimationVariant, ViewInProps } from './type';

const getVariantStyles = (variant: AnimationVariant) => {
  const variants = {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideUp: {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
    },
    slideDown: {
      from: { opacity: 0, transform: 'translateY(-30px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
    },
    slideLeft: {
      from: { opacity: 0, transform: 'translateX(30px)' },
      to: { opacity: 1, transform: 'translateX(0px)' },
    },
    slideRight: {
      from: { opacity: 0, transform: 'translateX(-30px)' },
      to: { opacity: 1, transform: 'translateX(0px)' },
    },
    scale: {
      from: { opacity: 0, transform: 'scale(0.9)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
  };
  return variants[variant];
};

const ViewIn: React.FC<ViewInProps> = ({
  children,
  immediate = false,
  threshold = 0,
  once = true,
  variant = 'fadeIn',
  duration = 500,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const variantStyle = getVariantStyles(variant);

  const animationStyle = useSpring({
    ...variantStyle.to,
    from: variantStyle.from,
    immediate: immediate,
    config: {
      ...config.gentle,
      duration: duration,
    },
    delay: delay,
    reset: !once,
    reverse: !isVisible,
  });

  useEffect(() => {
    if (immediate) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setIsVisible(true);
          setHasAnimated(true);

          if (once) {
            observer.current?.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [immediate, once, hasAnimated, threshold]);

  return (
    <animated.div ref={ref} style={animationStyle}>
      {children}
    </animated.div>
  );
};

export default ViewIn;
