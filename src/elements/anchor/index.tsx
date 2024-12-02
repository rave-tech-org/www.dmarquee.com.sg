import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { AnchorContextProps, AnchorProps } from './type';
import eventOnMount from '@/hooks/events/event-on-mount';

const AnchorContext = createContext<AnchorContextProps | undefined>(undefined);

const Anchor: React.FC<AnchorProps> = ({ children, offsetTop = 0, className = '' }) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const anchors = document.querySelectorAll('[data-anchor]');
      let closest: Element | null = null;
      let closestDistance = Infinity;

      anchors.forEach((anchor) => {
        const distance = Math.abs(anchor.getBoundingClientRect().top - offsetTop);
        if (distance < closestDistance) {
          closest = anchor;
          closestDistance = distance;
        }
      });

      if (closest) {
        setActiveLink((closest as Element).getAttribute('data-anchor') || '');
      }
    };

    eventOnMount('scroll', handleScroll);
  }, [offsetTop]);

  const scrollToAnchor = (anchorId: string) => {
    const element = document.querySelector(`[data-anchor="${anchorId}"]`);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offsetTop;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
      setActiveLink(anchorId);
    }
  };

  return (
    <AnchorContext.Provider value={{ activeLink, scrollToAnchor }}>
      <div ref={containerRef} className={`anchor-container ${className}`}>
        <div className="anchor-wrapper">{children}</div>
      </div>
    </AnchorContext.Provider>
  );
};

interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const AnchorLink: React.FC<AnchorLinkProps> = ({ href, children, className = '' }) => {
  const context = useContext(AnchorContext);
  if (!context) {
    throw new Error('AnchorLink must be used within an Anchor component');
  }

  const { activeLink, scrollToAnchor } = context;
  const isActive = activeLink === href;

  return (
    <div className="anchor-link-wrapper">
      <a
        href={`#${href}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToAnchor(href);
        }}
        className={`anchor-link ${isActive ? 'active' : ''} ${className}`}
      >
        {children}
      </a>
    </div>
  );
};

interface AnchorPointProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const AnchorPoint: React.FC<AnchorPointProps> = ({ id, children, className = '' }) => {
  return (
    <div data-anchor={id} className={`anchor-point ${className}`}>
      {children}
    </div>
  );
};

export { Anchor, AnchorLink, AnchorPoint };
