import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import {
  imgSliderContent,
  InfoSliderContent,
  leftIntroParagraph,
  rightIntroParagraph,
} from '@/components/previous-project/content/home/introduction';
import useScrollTo from '@/hooks/client/use-scroll-to';

const IntroductionSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const infoSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          dots: true,
        },
      },
    ],
  };

  const textRevealVariant = (delay: number) => ({
    hidden: {
      opacity: 0,
      y: 20, // Start below the final position
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay, // Optional delay before the animation starts
        duration: 0.5, // Duration of the animation
        ease: 'easeInOut', // Easing function
      },
    },
  });
  const { scrollTo } = useScrollTo();

  return (
    <div id="introduction-section" className="introduction-section">
      <div className="slide-section">
        <div className="center-wrapper">
          <Slider {...settings}>
            {imgSliderContent.map((item, index) => (
              <div key={`img-slider-${index}`}>
                <div className="intro-item">
                  <Image src={item.img} layout="responsive" width={800} height={600} alt={item.imgAlt} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="content-section">
        <h1>Introducing the Reimagined D’Marquee at Downtown East in Pasir Ris</h1>
        <div className="flex-row">
          <div className="flex-item">
            <div dangerouslySetInnerHTML={{ __html: leftIntroParagraph }} />
          </div>
          <div className="flex-item">
            <div dangerouslySetInnerHTML={{ __html: rightIntroParagraph }} />
            <p>
              If you can imagine it, we can make it happen.{' '}
              <button className="contact-us" onClick={() => scrollTo('form-section', 120)}>
                Contact us
              </button>{' '}
              for a Free Consultation today!
            </p>
          </div>
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

      <div className="divider-wrapper"></div>

      <div className="info-section">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={textRevealVariant(0)}>
          Large event SPACES for your most memorable occasion!
        </motion.h2>
        <div className="center-wrapper">
          <Slider {...infoSettings}>
            {InfoSliderContent.info.map((info, index) => (
              <div key={`info-${index}`}>
                <div className="image-item">
                  <Image src={info.img} layout="responsive" width={72} height={72} alt={info.imgAlt} />
                  <h3>{info.title}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;
