'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import { galleryPhotos } from '@/components/previous-project/content/home/zoom-slider';
import useScrollTo from '@/hooks/client/use-scroll-to';

const ZoomSliderSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          autoplay: true,
          dots: true,
        },
      },
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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
        },
      },
    ],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const currentImage = currentImageIndex != null ? galleryPhotos[currentImageIndex] : null;
  const prevImage = currentImageIndex != null ? galleryPhotos[currentImageIndex - 1] : null;
  const nextImage = currentImageIndex != null ? galleryPhotos[currentImageIndex + 1] : null;

  const openImage = (index: number) => {
    setCurrentImageIndex(index);
    setTimeout(() => {
      const zoomIn = document.querySelector('.ril-zoom-in') as HTMLElement;
      if (zoomIn) {
        zoomIn.click();
      }
    }, 500);
    setTimeout(() => {
      const zoomOut = document.querySelector('.ril-zoom-out') as HTMLElement;
      if (zoomOut) {
        zoomOut.click();
      }
    }, 500);
  };

  const { scrollTo } = useScrollTo();

  return (
    <div className="zoom-slider-section">
      <p>Click the image to view it in a larger size</p>
      <Slider {...settings}>
        {galleryPhotos.map((photo, index) => (
          <div key={`gallery-photo-${index}`} style={{ marginLeft: 4, marginRight: 4 }}>
            <div className="image-item" onClick={() => openImage(index)}>
              <Image src={photo.url} width={340} height={210} alt={photo.title} />
            </div>
          </div>
        ))}
      </Slider>
      <div className="btn-group">
        <button onClick={() => scrollTo('form-section', 120)} className="btn-primary">
          Get quote
        </button>
      </div>

      {!!currentImage && (
        <Lightbox
          mainSrc={currentImage?.url || ''}
          prevSrc={prevImage?.url}
          nextSrc={nextImage?.url}
          onCloseRequest={() => setCurrentImageIndex(null)}
          onMovePrevRequest={() => currentImageIndex != null && setCurrentImageIndex(currentImageIndex - 1)}
          onMoveNextRequest={() => currentImageIndex != null && setCurrentImageIndex(currentImageIndex + 1)}
          imageTitle={currentImage?.title || ''}
          imageCaption={currentImage?.desc || ''}
        />
      )}
    </div>
  );
};

export default ZoomSliderSection;
