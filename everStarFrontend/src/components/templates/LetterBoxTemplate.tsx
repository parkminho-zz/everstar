import React, { useState } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { Glass } from 'components/molecules/Glass/Glass';
import { LetterBox } from 'components/organics/LetterBox/LetterBox';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [letters] = useState(letterData);

  const handleLetterClick = (id: number) => {
    navigate(`/earth/letter/${id}`);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Glass
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPageIndicator={true}
        className="w-full h-auto sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5"
      />
      <div className="absolute inset-0 flex flex-col items-center p-4 sm:p-8">
        <ModalHeader text={headerText} onLeftIconClick={() => navigate(-1)} />
        <div className="flex flex-col items-center w-full max-w-5xl mt-9 sm:mt-20">
          <LetterBox
            letters={letters}
            onLetterClick={handleLetterClick}
            currentPage={currentPage}
            itemsPerPage={6}
          />
        </div>
      </div>
    </div>
  );
};

export { LetterBoxTemplate };
