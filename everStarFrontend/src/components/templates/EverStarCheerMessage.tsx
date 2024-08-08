import React, { useState } from 'react';
import {
  CheerMessage,
  CheerMessageProps,
} from 'components/organics/CheerMessage/CheerMessage';
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
    <div>
      <CheerMessage
        {...props}
        postItCards={postItCards}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
