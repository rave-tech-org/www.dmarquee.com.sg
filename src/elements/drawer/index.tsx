'use client';

import React, { useEffect, useState } from 'react';
import Portal from '@/elements/portal';
import { useTransition, animated } from '@react-spring/web';
import { DrawerProps } from './type';
import { DefaultCross } from '@elements/icons/default-cross';

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  width = '300px',
  height = '100%',
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const transitions = useTransition(isOpen, {
    from: getInitialStyles(position),
    enter: { transform: 'translate3d(0%, 0%, 0)' },
    leave: getInitialStyles(position),
    config: { tension: 300, friction: 35 },
  });

  const backdropTransition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 300, friction: 26 },
  });

  if (!mounted) return null;

  return (
    <Portal containerId="generic-drawer-container">
      {backdropTransition(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                ...styles,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9998,
              }}
              onClick={onClose}
            />
          )
      )}
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                ...styles,
                position: 'fixed',
                background: 'white',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                zIndex: 9999,
                ...(position === 'left' || position === 'right'
                  ? { top: 0, [position]: 0, width, height }
                  : { left: 0, [position]: 0, height: width, width: '100%' }),
              }}
            >
              <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <DefaultCross width={32} height={32} />
              </button>
              {children}
            </animated.div>
          )
      )}
    </Portal>
  );
};

function getInitialStyles(position: 'left' | 'right' | 'top' | 'bottom') {
  switch (position) {
    case 'left':
      return { transform: 'translate3d(-100%, 0%, 0)' };
    case 'right':
      return { transform: 'translate3d(100%, 0%, 0)' };
    case 'top':
      return { transform: 'translate3d(0%, -100%, 0)' };
    case 'bottom':
      return { transform: 'translate3d(0%, 100%, 0)' };
  }
}

export default Drawer;
