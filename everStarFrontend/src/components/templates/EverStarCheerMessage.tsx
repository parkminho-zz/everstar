import React, { useEffect, useState } from 'react';
import {
  CheerMessage,
  CheerMessageProps,
} from 'components/organics/CheerMessage/CheerMessage';

import bgImage from 'assets/images/bg-everstar.webp';
import { Header } from 'components/molecules/Header/Header';
import { Footer } from 'components/molecules/Footer/Footer';
import { useMediaQuery } from 'react-responsive';
import { useFetchCheeringPet } from 'hooks/useEverStar';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';

export const EverStarCheerMessage: React.FC<
  Omit<CheerMessageProps, 'currentPage' | 'onPageChange'>
> = (props) => {
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);

  const { data, isLoading, isError } = useFetchCheeringPet();

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

  useEffect(() => {
    // window.location.reload();
  }, []);

  // 로딩 및 오류 상태 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  console.log(data);

  // data.data.content 배열을 매핑
  const postItCards =
    data?.data?.content?.map(
      (item: {
        content: string;
        petName: string;
        color: string;
        cheeringMessageId: number;
        petId: number;
      }) => ({
        contents: item.content || '',
        name: item.petName || '',
        color: item.color.toLowerCase() || '',
        cheeringMessageId: item.cheeringMessageId,
        petId: petId,
      })
    ) || [];

  console.log('Mapped postItCards:', postItCards);

  return (
    <div
      className='flex flex-col min-h-screen bg-center bg-cover'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header type={headerType} className='sticky top-0 z-50' />

      <CheerMessage
        {...props}
        postItCards={postItCards}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer type={footerType} className='mt-auto' />
    </div>
  );
};
