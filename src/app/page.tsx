'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import IntroductionSection from '@client-components/introduction-section';
// import OccasionSection from '@client-components/occasion-section';
// import MovingTextSection from '@client-components/moving-text-section';
// import ZoomSliderSection from '../components/client/zoom-slider-section';
// // import FormSection from '../components/client/form-section'
// import ClientInfoSection from '../components/client/client-info-section';
// import EmbeddedFormSection from '../components/client/embedded-form-section';
import useScrollTo from '@/hooks/client/use-scroll-to';
import IntroductionSection from '@/components/previous-project/introduction-section';
import OccasionSection from '@/components/previous-project/occasion-section';
import MovingTextSection from '@/components/previous-project/moving-text-section';
import ZoomSliderSection from '@/components/previous-project/zoom-slider-section';
import ClientInfoSection from '@/components/previous-project/client-info-section';
import EmbeddedFormSection from '@/components/previous-project/embedded-form-section';

const Home = () => {
  const revealVariants = (delay: number) => ({
    hidden: {
      clipPath: 'inset(0 0 100% 0)',
    },
    visible: {
      clipPath: 'inset(0 0 0 0)',
      transition: {
        delay,
        duration: 1,
        ease: 'easeInOut',
      },
    },
  });

  const zoomInVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const textRevealVariant = (delay: number) => ({
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  });

  const [moving, setMoving] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setMoving(true);
    }, 1000);
  }, []);

  const { scrollTo } = useScrollTo();

  return (
    <div id="home-page" className="home-page">
      <div id="banner-section" className="banner-section wrapper">
        <div className="image-contain-component">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants(0.5)}
            className="left-bottom"
          >
            <Image src="/assets/images/left-bottom.jpg" fill alt="Picture of the author" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants(1.8)}
            className="right-top"
          >
            <Image src="/assets/images/right-top.jpg" fill alt="Picture of the author" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants(1)}
            className="right-bottom-2"
          >
            <Image src="/assets/images/right-bottom-2.jpg" fill alt="Picture of the author" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants(1.6)}
            className="right-bottom-1"
          >
            <Image src="/assets/images/right-bottom-1.jpg" fill alt="Picture of the author" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants(2.3)}
            className="left-top-1"
          >
            <Image src="/assets/images/left-top-1.jpg" fill alt="Picture of the author" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants(1.3)}
            className="left-top-2"
          >
            <Image src="/assets/images/left-top-2.jpg" fill alt="Picture of the author" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={zoomInVariant}
            className={`logo-element ${moving ? 'moving-element' : ''}`}
          >
            <Image src="/assets/images/logo-element.png" fill alt="Logo Element" />
          </motion.div>

          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(0.1)}
            className="content-first one"
          >
            D’Marquee:
          </motion.h1>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(0.2)}
            className="content-first two"
          >
            Indoor MICE
          </motion.h1>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(0.3)}
            className="content-first three"
          >
            Venue with D’Resort
          </motion.h1>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(0.4)}
            className="content-first four"
          >
            in
          </motion.h1>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(0.5)}
            className="content-first five"
          >
            Downtown East
          </motion.h1>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(0.6)}
            className="content-first six"
          >
            , Pasir Ris!
          </motion.h1>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(1)}
            className="content-third"
          >
            Available now for bookings.
          </motion.p>
          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(1.1)}
            className="content-btn btn-primary"
            onClick={() => scrollTo('form-section', 120)}
          >
            CLICK HERE FOR FREE CONSULATION!
          </motion.button>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textRevealVariant(0)}
            className="arrow-down bounce-hover"
            onClick={() => scrollTo('introduction-section', 60)}
          >
            <Image src="/assets/images/arrow-down.svg" fill alt="Picture of the author" />
          </motion.div>
        </div>
      </div>
      <IntroductionSection />

      <OccasionSection />

      <MovingTextSection />

      <ZoomSliderSection />

      <ClientInfoSection />

      <EmbeddedFormSection />
    </div>
  );
};

export default Home;
