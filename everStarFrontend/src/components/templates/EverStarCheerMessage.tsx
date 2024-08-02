import React, { useState } from 'react';
import {
  CheerMessage,
  CheerMessageProps,
} from 'components/organics/CheerMessage/CheerMessage';

import bgImage from 'assets/images/bg-everstar.png';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { useMediaQuery } from 'react-responsive';

export const EverStarCheerMessage: React.FC<
  Omit<CheerMessageProps, 'currentPage' | 'onPageChange'>
> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
      <Header type={headerType} className='sticky top-0 z-50' />

      <CheerMessage
        {...props}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer type={footerType} className='mt-auto' />
    </div>
  );
};
