import React from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { Glass } from 'components/molecules/Glass/Glass';
import { LetterBox } from 'components/organics/LetterBox/LetterBox';
import { useNavigate } from 'react-router-dom';
import { useFetchLetterPet } from 'hooks/useEarth';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

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
  totalPages?: number;
  onPageChange: (newPage: number) => void;
  headerText: string;
}

const LetterBoxTemplate: React.FC<LetterBoxTemplateProps> = ({
  currentPage,
  onPageChange,
  headerText,
}) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchLetterPet();

  // 로딩 및 오류 상태 처리
  if (isLoading) {
    return (
      <div className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover z-[-1]'>
        <img
          src={bgImage}
          alt='Background'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <SplashTemplate
          type='LetterBoxRocket'
          className='z-10 w-full h-full '
        />
      </div>
    );
  }
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
  const itemPage = 9;
  const letterLength = petLetters.length;
  const letterTotalPage = Math.floor(letterLength / itemPage) + 1;

  const handleLetterClick = (id: number) => {
    navigate(`/earth/letter/${id}`);
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen'>
      <div className='absolute inset-0'>
        <Glass
          currentPage={currentPage}
          totalPages={letterTotalPage}
          onPageChange={onPageChange}
          showPageIndicator={true}
          className='w-full h-full'
        />
      </div>
      <div className='relative z-10 flex flex-col items-center w-full max-w-5xl p-4 mb-60 sm:p-8'>
        <ModalHeader text={headerText} onLeftIconClick={() => navigate(-1)} />
        <div className='flex flex-col items-center w-full mt-9 sm:mt-20'>
          <LetterBox
            letters={petLetters}
            onLetterClick={handleLetterClick}
            currentPage={currentPage}
            itemsPerPage={itemPage}
          />
        </div>
      </div>
    </div>
  );
};

export { LetterBoxTemplate };
