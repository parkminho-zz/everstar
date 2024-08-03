import React, { useState } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { Glass } from 'components/molecules/Glass/Glass';
import { LetterBox } from 'components/organics/LetterBox/LetterBox';
import { useMediaQuery } from 'react-responsive';

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
  letterData,
  currentPage,
  totalPages,
  onPageChange,
  headerText,
}) => {
  const [letters, setLetters] = useState(letterData);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });

  const handleLetterClick = (id: number) => {
    setLetters(
      letters.map((letter) => (letter.id === id ? { ...letter, state: 'received' } : letter))
    );
  };

  // Set items per page based on screen size
  const itemsPerPage = isMobile ? 2 : isTablet ? 6 : 6;

  return (
    <div className='relative flex items-center justify-center min-h-screen'>
      <Glass
        variant={isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPageIndicator={true}
      />
      <div className={`absolute inset-0 flex flex-col items-center ${isMobile ? '' : 'p-8'} `}>
        <ModalHeader text={headerText} />
        <div
          className={`flex flex-col items-center w-full max-w-5xl  ${isMobile ? 'mt-9' : 'p-8 mt-20'} `}
        >
          <LetterBox
            letters={letters}
            onLetterClick={handleLetterClick}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export { LetterBoxTemplate };
