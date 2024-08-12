import React, { useState } from 'react';
import {
  CheerMessage,
  CheerMessageProps,
} from 'components/organics/CheerMessage/CheerMessage';
import { useFetchCheeringPet } from 'hooks/useEverStar';

export const EverStarCheerMessage: React.FC<
  Omit<CheerMessageProps, 'currentPage' | 'onPageChange'>
> = (props) => {
  const { data, isLoading, isError } = useFetchCheeringPet();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 로딩 및 오류 상태 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  console.log(data);
  const postItCards =
    data?.data?.content?.map(
      (item: {
        content: string;
        petName: string;
        color: string;
        cheeringMessageId: number;
        petId: number;
        relationShip: string;
      }) => ({
        contents: item.content || '',
        name: item.petName + ' ' + item.relationShip || '',
        color: item.color.toLowerCase() || '',
        cheeringMessageId: item.cheeringMessageId,
        petId: item.petId,
      })
    ) || [];
  const totalPages = Math.ceil(postItCards.length / 10); // 예시로 페이지 수 계산

  return (
    <div>
      <CheerMessage
        {...props}
        postItCards={postItCards}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
