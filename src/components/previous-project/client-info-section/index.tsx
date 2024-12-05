import { motion } from 'framer-motion';
import { clientLogos } from '@/components/previous-project/content/home/clients-info';

const ClientInfoSection = () => {
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
    <div className="client-info">
      <div className="center-wrapper">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textRevealVariant(0)}>
          Our Distinguished CLIENTELE
        </motion.h2>
        <div className="client-info-row">
          {clientLogos.map((logo, index) => (
            <div className="client-info-column" key={`logo-${index}`}>
              <img className="logo-img" src={logo.url} alt={logo.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientInfoSection;
