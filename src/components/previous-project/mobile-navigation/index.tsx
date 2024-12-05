'use client';

import { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import useDimensions from '@/hooks/client/use-dimensions';
import useScrollTo from '@/hooks/client/use-scroll-to';
import { MenuItem } from '@/components/previous-project/menu-item';
import { MenuToggle } from '@/components/previous-project/menu-toggle';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(18px at calc(100% - 24px) 24px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export const MobileNavigation = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { height } = useDimensions(containerRef);
  const { scrollTo } = useScrollTo();
  return (
    <motion.nav initial={false} animate={isOpen ? 'open' : 'closed'} custom={height} ref={containerRef}>
      <motion.div className="background" variants={sidebar} />
      <motion.ul variants={variants}>
        {itemIds.map((item, key) => (
          <MenuItem key={key}>
            <a
              onClick={() => {
                scrollTo(item.id);
                toggleOpen();
              }}
            >
              {item.label}
            </a>
          </MenuItem>
        ))}
        <MenuItem>
          <div
            onClick={() => {
              scrollTo('form-section', 120);
              toggleOpen();
            }}
            className="enquiry-btn"
          >
            Enquiry Now
          </div>
        </MenuItem>
      </motion.ul>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

const itemIds = [
  {
    label: 'Home',
    id: 'page-layout',
  },
  {
    label: 'Introduction',
    id: 'introduction-section',
  },
  {
    label: 'Occasions',
    id: 'occasion-section',
  },
  {
    label: 'Gallery',
    id: 'moving-text-section',
  },
];
