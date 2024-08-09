import React from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { Glass } from 'components/molecules/Glass/Glass';
import { LetterBox } from 'components/organics/LetterBox/LetterBox';
import { useNavigate } from 'react-router-dom';
import { useFetchLetterPet } from 'hooks/useEarth';

interface Letter {
  id: number;
  type: 'default' | 'send' | 'receive';
  color: 'white' | 'bgorange' | 'orange' | 'gray';
  state: 'received' | 'notReceived';
  name: string;
  sendMessage: string;
  dateTime: string;
}

interface LetterBoxTemplateProps {
  letterData: Letter[];
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  headerText: string;
}

const LetterBoxTemplate: React.FC<LetterBoxTemplateProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  headerText,
}) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchLetterPet();

  // 로딩 및 오류 상태 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const petLetters =
    data?.data?.content?.map(
      (item: {
        petLetterId: number;
        isRead: boolean;
        petName: string;
        content: string;
        createAt: string;
      }) => ({
        id: item.petLetterId,
        type: 'default',
        color: 'white',
        state: item.isRead ? 'received' : 'notReceived',
        name: item.petName,
        sendMessage:
          item.content.length > 10
            ? item.content.slice(0, 10) + '...'
            : item.content, // 10글자 초과 시 '...' 추가
        dateTime: new Date(item.createAt).toLocaleString(),
      })
    ) || [];

  const handleLetterClick = (id: number) => {
    navigate(`/earth/letter/${id}`);
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen'>
      <Glass
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPageIndicator={true}
        className='w-full h-auto sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5'
      />
      <div className='absolute inset-0 flex flex-col items-center p-4 sm:p-8'>
        <ModalHeader text={headerText} onLeftIconClick={() => navigate(-1)} />
        <div className='flex flex-col items-center w-full max-w-5xl mt-9 sm:mt-20'>
          <LetterBox
            letters={petLetters}
            onLetterClick={handleLetterClick}
            currentPage={currentPage}
            itemsPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export { LetterBoxTemplate };
