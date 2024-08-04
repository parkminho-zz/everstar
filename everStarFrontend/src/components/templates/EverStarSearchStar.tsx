import React from 'react';
import { SearchStar } from 'components/organics/searchStar/SearchStar';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { useMediaQuery } from 'react-responsive';
import bgImage from 'assets/images/bg-everstar.png';

interface EverStarSearchStarProps {}

export const EverStarSearchStar: React.FC<EverStarSearchStarProps> = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const headerType = isMobile
    ? 'mobile-everstar'
    : isTabletOrMobile
      ? 'tablet-everstar'
      : 'everstar';

  const footerType = isMobile
    ? 'mobile'
    : isTabletOrMobile
      ? 'tablet'
      : 'desktop';

  return (
    <div
      className='flex flex-col min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header type={headerType} className='sticky top-0 z-50' /> <SearchStar />
      <Footer type={footerType} className='mt-auto' />
    </div>
  );
};

export type { EverStarSearchStarProps };
