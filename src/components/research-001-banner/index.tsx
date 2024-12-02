'use client';

import { Entries } from '@/hooks/local/use-entries';
import type { GetContentBlockResult } from '@/sanity/sanity.types';
import { transformObject } from '@/utils';
import { gsap } from 'gsap';
import { PortableText } from 'next-sanity';
import { Fragment, useEffect, useRef } from 'react';
import type { ResearchZeroZeroOneBannerCustomAttributesProps, ResearchZeroZeroOneBannerProps } from './type';

const config = { cardHeight: 300, cardWidth: 200, gap: 40, numberSize: 50 };

export default function ResearchZeroZeroOneBanner<
  B extends GetContentBlockResult = GetContentBlockResult,
  E = Entries,
>({ block }: ResearchZeroZeroOneBannerProps<B, E>) {
  const data = block?.listItems || [];
  const custom = transformObject<ResearchZeroZeroOneBannerCustomAttributesProps>(block?.customAttributes);
  const ctaText = custom['cta-text'];

  const { cardHeight, cardWidth, gap, numberSize } = config;

  const isInitializedRef = useRef(false);

  const orderRef = useRef(Array.from({ length: data?.length }, (_, index) => index));
  const detailsEvenRef = useRef(true);

  const offsetTop = useRef(200);
  const offsetLeft = useRef(700);

  const ease = 'sine.inOut';

  const getCard = (index: number) => `#card${index}`;
  const getCardContent = (index: number) => `#card-content-${index}`;
  const getSliderItem = (index: number) => `#slide-item-${index}`;

  const animate = (target: gsap.TweenTarget, duration: number, properties: gsap.TweenVars) => {
    return new Promise((resolve) => {
      gsap.to(target, {
        ...properties,
        duration,
        onComplete: resolve,
      });
    });
  };

  function init() {
    const [active, ...rest] = orderRef.current;
    const detailsActive = detailsEvenRef.current ? '#details-even' : '#details-odd';
    const detailsInactive = detailsEvenRef.current ? '#details-odd' : '#details-even';
    const { innerHeight: height, innerWidth: width } = window;
    offsetTop.current = height - 430;
    offsetLeft.current = width - 830;

    gsap.set('#pagination', {
      top: offsetTop.current + 330,
      left: offsetLeft.current,
      y: 200,
      opacity: 0,
      zIndex: 60,
    });

    gsap.set(getCard(active), {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
    gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
    gsap.set(`${detailsInactive} .desc`, { y: 50 });
    gsap.set(`${detailsInactive} .cta`, { y: 60 });

    gsap.set('.progress-sub-foreground', {
      width: 500 * (1 / orderRef.current.length) * (active + 1),
    });

    rest.forEach((i, index) => {
      gsap.set(getCard(i), {
        x: offsetLeft.current + 400 + index * (cardWidth + gap),
        y: offsetTop.current,
        width: cardWidth,
        height: cardHeight,
        zIndex: 30,
        borderRadius: 10,
      });
      gsap.set(getCardContent(i), {
        x: offsetLeft.current + 400 + index * (cardWidth + gap),
        zIndex: 40,
        y: offsetTop.current + cardHeight - 100,
      });
      gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
    });

    gsap.set('.indicator', { x: -window.innerWidth });

    const startDelay = 0.6;

    gsap.to('.cover', {
      x: width + 400,
      delay: 0.5,
      ease,
      onComplete: () => {
        setTimeout(() => {
          loop();
        }, 500);
      },
    });
    rest.forEach((i, index) => {
      gsap.to(getCard(i), {
        x: offsetLeft.current + index * (cardWidth + gap),
        zIndex: 30,
        delay: startDelay + 0.05 * index,
        ease,
      });
      gsap.to(getCardContent(i), {
        x: offsetLeft.current + index * (cardWidth + gap),
        zIndex: 40,
        delay: startDelay + 0.05 * index,
        ease,
      });
    });
    gsap.to('#pagination', { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
  }

  const clicksRef = useRef(0);

  function step(direction: 'next' | 'prev' = 'next') {
    const isPrev = direction === 'prev';
    return new Promise((resolve) => {
      if (isPrev) {
        const lastItem = orderRef.current.pop();
        if (lastItem !== undefined) orderRef.current.unshift(lastItem);
      } else {
        const firstItem = orderRef.current.shift();
        if (firstItem !== undefined) orderRef.current.push(firstItem);
      }

      detailsEvenRef.current = !detailsEvenRef.current;

      const detailsActive = detailsEvenRef.current ? '#details-even' : '#details-odd';
      const detailsInactive = detailsEvenRef.current ? '#details-odd' : '#details-even';
      const activeData = data[orderRef.current[0]];

      const title1 = document.querySelector(`${detailsActive} .title-1`);
      if (title1) {
        title1.textContent = activeData.title;
      }

      const desc = document.querySelector(`${detailsActive} .desc`);
      if (desc) {
        desc.textContent = activeData?.description?.[0]?.children?.[0]?.text ?? '';
      }
      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });

      gsap.to(`${detailsActive} .title-1`, {
        y: 0,
        delay: 0.15,
        duration: 0.7,
        ease,
      });

      gsap.to(`${detailsActive} .desc`, {
        y: 0,
        delay: 0.3,
        duration: 0.4,
        ease,
      });
      gsap.to(`${detailsActive} .cta`, {
        y: 0,
        delay: 0.35,
        duration: 0.4,
        onComplete: resolve,
        ease,
      });
      gsap.set(detailsInactive, { zIndex: 12 });

      const [active, ...rest] = orderRef.current;
      const prv = rest[rest.length - 1];

      gsap.set(getCard(prv), { zIndex: 10 });
      gsap.set(getCard(active), { zIndex: 20 });
      gsap.to(getCard(prv), { scale: 1.5, ease });

      gsap.to(getCardContent(active), {
        y: offsetTop.current + cardHeight - 10,
        opacity: 0,
        duration: 0.3,
        ease,
      });

      const sliderDirection = isPrev ? -1 : 1;
      gsap.to(getSliderItem(active), { x: 0, ease });
      gsap.to(getSliderItem(prv), { x: -numberSize * sliderDirection, ease });
      gsap.to('.progress-sub-foreground', {
        width: 500 * (1 / orderRef.current.length) * (active + 1),
        ease,
      });

      gsap.to(getCard(active), {
        x: 0,
        y: 0,
        ease,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          const xNew = offsetLeft.current + (rest.length - 1) * (cardWidth + gap);

          if (isPrev) {
            gsap.set(getCard(data.length - 1 === active ? 0 : active + 1), {
              borderRadius: 10,
            });
          }

          gsap.set(getCard(prv), {
            x: xNew,
            y: offsetTop.current,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });

          gsap.set(getCardContent(prv), {
            x: xNew,
            y: offsetTop.current + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
          });
          gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

          gsap.set(detailsInactive, { opacity: 0 });
          gsap.set(`${detailsInactive} .title-1`, { y: 100 });
          gsap.set(`${detailsInactive} .desc`, { y: 50 });
          gsap.set(`${detailsInactive} .cta`, { y: 60 });

          clicksRef.current -= 1;
          if (clicksRef.current > 0) {
            step(direction);
          }
        },
      });

      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew = offsetLeft.current + index * (cardWidth + gap);
          gsap.set(getCard(i), { zIndex: 30 });
          gsap.to(getCard(i), {
            x: xNew,
            y: offsetTop.current,
            width: cardWidth,
            height: cardHeight,
            ease,
            delay: 0.1 * (index + 1),
          });

          gsap.to(getCardContent(i), {
            x: xNew,
            y: offsetTop.current + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
            ease,
            delay: 0.1 * (index + 1),
          });
          gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
        }
      });
    });
  }

  const loop = async () => {
    await animate('.indicator', 2, { x: 0 });
    await animate('.indicator', 0.8, { x: window.innerWidth, delay: 0.3 });
    gsap.set('.indicator', { x: -window.innerWidth });
    await step();
    loop();
  };

  const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const loadImages = async () => {
    const promises = data.map(({ imageUrl }) => imageUrl && loadImage(imageUrl));
    return Promise.all(promises);
  };

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;

      const start = async () => {
        try {
          document.body.classList.add('overflow-x-hidden');
          await loadImages();
          init();
        } catch (error) {
          console.error('One or more images failed to load', error);
        }
      };

      start();
    }
  });

  return (
    <div className="research-001-banner-wrapper">
      <div className="indicator" />

      <div id="demo">
        {data.map((item, index) => (
          <Fragment key={index}>
            <div className="card" id={`card${index}`} style={{ backgroundImage: `url(${item.imageUrl})` }} />
            <div className="card-content" id={`card-content-${index}`}>
              <div className="content-start" />
              <div className="content-title-1 uppercase">{item.title}</div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="details" id="details-even">
        <div className="title-box-1">
          <div className="title-1">{data[0].title}</div>
        </div>

        <div className="desc">
          <PortableText value={data[0].description ?? []} />
        </div>
        <div className="cta">
          <button type="button" className="bookmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button type="button" className="discover">
            {ctaText}
          </button>
        </div>
      </div>

      <div className="details" id="details-odd">
        <div className="title-box-1">
          <div className="title-1">{data[0].title}</div>
        </div>

        <div className="desc">
          <PortableText value={data[0].description ?? []} />
        </div>
        <div className="cta">
          <button type="button" className="bookmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button type="button" className="discover">
            {ctaText}
          </button>
        </div>
      </div>

      <div className="pagination" id="pagination">
        <button type="button" className="arrow arrow-left" onClick={() => step('prev')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button type="button" className="arrow arrow-right" onClick={() => step()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <div className="progress-sub-container">
          <div className="progress-sub-background">
            <div className="progress-sub-foreground" />
          </div>
        </div>
        <div className="slide-numbers" id="slide-numbers">
          {data.map((_, index) => (
            <div key={index} className="item" id={`slide-item-${index}`}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="cover" />
    </div>
  );
}
