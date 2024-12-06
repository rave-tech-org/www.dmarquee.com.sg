'use client';

import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';

interface ViewInProps {
  children: React.ReactNode;
  immediate?: boolean;
  once?: boolean;
  variant?: AnimationVariant;
  duration?: number;
  delay?: number;
  className?: string;
}

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
  once = true,
  variant = 'fadeIn',
  duration = 0.5,
  delay = 0,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  const variantStyle = getVariantStyles(variant);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (immediate) {
      animationRef.current = gsap.context(() => {
        gsap.to(element, {
          ...variantStyle.to,
          duration,
          delay: delay / 1000,
          ease: 'power2.out',
        });
      });
    } else {
      animationRef.current = gsap.context(() => {
        const animation = gsap.to(element, {
          ...variantStyle.to,
          duration,
          delay: delay / 1000,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=10%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        });

        return () => {
          animation.kill();
        };
      });
    }

    return () => {
      animationRef.current?.revert();
    };
  }, [immediate, once, duration, delay, variantStyle.to]);

  return (
    <div ref={elementRef} className={cn(className)} style={variantStyle.from}>
      {children}
    </div>
  );
};

export default ViewIn;
