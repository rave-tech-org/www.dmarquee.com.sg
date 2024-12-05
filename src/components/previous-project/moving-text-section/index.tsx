'use client';
import { motion } from 'framer-motion';

const MovingTextSection = () => {
  return (
    <div
      id="moving-text-section"
      className="moving-text-section"
      style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}
    >
      <div className="left-opacity"></div>
      <motion.h1 animate={{ x: ['100%', '-100%'] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>
        <span className="outline-text">PAST</span>
        <span className="primary-text">EVENTS</span>
        <span className="outline-text">AND</span>
        <span className="primary-text">EXPERIENCES</span>
      </motion.h1>
      <div className="right-opacity"></div>
    </div>
  );
};

export default MovingTextSection;
