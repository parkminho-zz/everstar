import React, { useState } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { LetterCard } from 'components/molecules/cards/LetterCard/LetterCard';
import { useMediaQuery } from 'react-responsive';

type LetterType = 'default' | 'send' | 'receive';
type LetterColor = 'white' | 'bgorange' | 'orange' | 'gray';
type LetterState = 'received' | 'notReceived';

interface Letter {
  id: number;
  type: LetterType;
  color: LetterColor;
  state: LetterState;
  name: string;
  sendMessage: string;
  dateTime: string;
}

const lettersData: Letter[] = [
  {
    id: 1,
    type: 'default',
    color: 'white',
    state: 'notReceived',
    name: 'John Doe',
    sendMessage: '안녕하세요!',
    dateTime: '2024-08-01',
  },
  {
    id: 2,
    type: 'default',
    color: 'bgorange',
    state: 'received',
    name: 'Jane Smith',
    sendMessage: '반갑습니다!',
    dateTime: '2024-08-01',
  },
  {
    id: 3,
    type: 'default',
    color: 'gray',
    state: 'notReceived',
    name: 'Alice Johnson',
    sendMessage: '잘 지내세요!',
    dateTime: '2024-08-01',
  },
  {
    id: 4,
    type: 'default',
    color: 'orange',
    state: 'received',
    name: 'Bob Brown',
    sendMessage: '좋은 하루 되세요!',
    dateTime: '2024-08-01',
  },
  {
    id: 5,
    type: 'default',
    color: 'white',
    state: 'notReceived',
    name: 'Charlie Black',
    sendMessage: '행복하세요!',
    dateTime: '2024-08-01',
  },
  {
    id: 6,
    type: 'default',
    color: 'bgorange',
    state: 'received',
    name: 'Dana White',
    sendMessage: '안녕히 계세요!',
    dateTime: '2024-08-01',
  },
];

const LetterBox = () => {
  const [letters, setLetters] = useState<Letter[]>(lettersData);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });

  const handleLetterClick = (id: number) => {
    setLetters(
      letters.map((letter) => (letter.id === id ? { ...letter, state: 'received' } : letter))
    );
  };

  const getGridClassName = () => {
    if (isMobile) {
      return 'grid-cols-1 grid-rows-6';
    } else if (isTablet) {
      return 'grid-cols-2 grid-rows-3';
    } else {
      return 'grid-cols-3 grid-rows-2';
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen'>
      <div className='flex w-[1025px] p-8 flex-col items-center gap-8 bg-white'>
        <ModalHeader text='편지함' />
        <div className='flex w-[1025px] p-8 flex-col items-center gap-8'>
          <div className={`grid ${getGridClassName()} gap-8`}>
            {letters.map((letter) => (
              <LetterCard
                key={letter.id}
                type={letter.type}
                color={letter.color}
                state={letter.state}
                name={letter.name}
                sendMessage={letter.sendMessage}
                dateTime={letter.dateTime}
                className={letter.state === 'received' ? 'opacity-50' : ''}
                onClick={() => handleLetterClick(letter.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { LetterBox };
