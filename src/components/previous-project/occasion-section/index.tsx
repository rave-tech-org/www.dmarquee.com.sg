'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ocassionContent from '@/components/previous-project/content/home/ocassion';
import useViewport from '@/hooks/client/use-viewport';
import useScrollTo from '@/hooks/client/use-scroll-to';

const OccasionCardLeftToRight = ({
  arrowImage,
  contentImage,
  content,
}: {
  arrowImage: {
    src: string;
    alt: string;
  };
  contentImage: {
    src: string;
    alt: string;
  };
  content: string;
}) => {
  const revealLeftToRight = (delay: number) => ({
    hidden: {
      clipPath: 'inset(0 100% 0 0)',
    },
    visible: {
      clipPath: 'inset(0)',
      transition: {
        delay,
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  });

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

  const zoomInVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <div className="occasion-card">
      <div className="left">
        <motion.div
          className="arrow-logo arrow-bounce"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomInVariant}
        >
          <Image src={arrowImage.src} layout="responsive" width={100} height={80} alt={arrowImage.alt} />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealLeftToRight(0.2)}
          style={{ marginRight: -1 }}
        >
          <div className="image-item border-right">
            <Image src={contentImage.src} layout="responsive" width={650} height={370} alt={contentImage.alt} />
          </div>
        </motion.div>
      </div>
      <div className="right">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textRevealVariant(0)}
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></motion.div>
      </div>
    </div>
  );
};

const OccasionCardRightToLeft = ({
  arrowImage,
  contentImage,
  content,
}: {
  arrowImage: {
    src: string;
    alt: string;
  };
  contentImage: {
    src: string;
    alt: string;
  };
  content: string;
}) => {
  const revealRightToLeft = (delay: number) => ({
    hidden: {
      clipPath: 'inset(0 0 0 100%)',
    },
    visible: {
      clipPath: 'inset(0)',
      transition: {
        delay,
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  });

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

  const zoomInVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <div className="occasion-card">
      <div className="left">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textRevealVariant(0)}
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></motion.div>
      </div>
      <div className="right">
        <motion.div
          className="arrow-logo arrow-bounce"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={zoomInVariant}
        >
          <Image src={arrowImage.src} layout="responsive" width={100} height={80} alt={arrowImage.alt} />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealRightToLeft(0.2)}
          style={{ marginLeft: -1 }}
        >
          <div className="image-item border-left">
            <Image src={contentImage.src} layout="responsive" width={72} height={72} alt={contentImage.alt} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const OccasionCard = ({
  contentImage,
  content,
}: {
  arrowImage: {
    src: string;
    alt: string;
  };
  contentImage: {
    src: string;
    alt: string;
  };
  content: string;
}) => {
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
  return (
    <div className="occasion-card">
      <div className="left">
        {/* <motion.div initial="hidden" whileInView="visible" variants={revealRightToLeft(0.2)} style={{ marginLeft: -1 }}> */}
        <div className="image-item border-left">
          <Image src={contentImage.src} width={360} height={230} alt={contentImage.alt} />
        </div>
        {/* </motion.div> */}
      </div>
      <div className="right">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textRevealVariant(0)}
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></motion.div>
      </div>
    </div>
  );
};

const OccasionSection = () => {
  const { isTablet } = useViewport();
  const { scrollTo } = useScrollTo();
  return (
    <div id="occasion-section" className="occasion-section">
      <div className="center-wrapper">
        {ocassionContent.cards.map((card, key) => {
          const isOdd = key % 2;
          if (isTablet) {
            return <OccasionCard {...card} key={`ocs-card-${key}`} />;
          }
          return !isOdd ? (
            <OccasionCardLeftToRight {...card} key={`ocs-card-${key}`} />
          ) : (
            <OccasionCardRightToLeft {...card} key={`ocs-card-${key}`} />
          );
        })}
        <div className="occasion-box">
          <p>Photos above are for illustration purposes only</p>
        </div>
        <div className="btn-group">
          <button onClick={() => scrollTo('form-section', 120)} className="btn-primary">
            Get a quote
          </button>
          <button onClick={() => scrollTo('form-section', 120)} className="btn-gray">
            Download floorplan
          </button>
        </div>
      </div>
    </div>
  );
};

export default OccasionSection;
