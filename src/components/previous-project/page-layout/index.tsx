'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';

import useScrollTo from '@/hooks/client/use-scroll-to';
import useViewport from '@/hooks/client/use-viewport';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageLayoutProps from './type';
import '@/styles/previous-project/customize.css';
import Footer from '@/components/previous-project/footer';
import { MobileNavigation } from '@/components/previous-project/mobile-navigation';

const PageLayout = ({ children, className }: PageLayoutProps) => {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { isTablet } = useViewport();

  const { scrollTo } = useScrollTo();

  const noLayoutPaths = ['/thank-you', '/discoverdmq'];

  if (noLayoutPaths.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div id="page-layout">
      <div
        id="navigation-header"
        className={`navigation-header  ${isSticky ? 'sticky m-wrapper' : 'wrapper'} ${isTablet ? 'mobile' : ''}`}
      >
        <ul>
          <li onClick={() => scrollTo('banner-section', 120)}>Home</li>
          <li onClick={() => scrollTo('introduction-section', 80)}>Introduction</li>
          <li onClick={() => scrollTo('occasion-section')}>Occasions</li>
          <li onClick={() => scrollTo('moving-text-section')}>Gallery</li>
        </ul>
        <button onClick={() => scrollTo('form-section', 120)} className="enquiry-btn">
          Enquire Now!
        </button>
      </div>
      <div className="mobile-navigation">
        <MobileNavigation />
      </div>
      <main className={`page-layout-content ${isSticky ? 'sticky' : ''}  ${isTablet ? 'mobile' : ''}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
