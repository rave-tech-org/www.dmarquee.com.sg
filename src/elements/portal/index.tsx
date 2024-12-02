'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  containerId?: string;
  className?: string;
}

const Portal = ({ children, containerId = 'portal-root', className = '' }: PortalProps) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let container = document.getElementById(containerId);

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', containerId);
      if (className) container.classList.add(className);
      document.body.appendChild(container);
    }

    containerRef.current = container;

    return () => {
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
      }
    };
  }, [containerId, className]);

  if (!containerRef.current) return null;

  return createPortal(children, containerRef.current);
};

export default Portal;
