import React, { useState } from 'react';
import { ProfileCard } from 'components/molecules/cards/ProfileCard/ProfileCard';
import { PostItCard } from 'components/molecules/cards/PostItCard/PostItCard';
import { PostItPlusCard } from 'components/molecules/cards/PostItPlusCard/PostItPlusCard';
import { Glass } from 'components/molecules/Glass/Glass';

interface CheerMessageProps {
  profile: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarUrl: string;
  };
  postItCards: Array<{ contents: string; name: string; color: string }>;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const CheerMessage: React.FC<CheerMessageProps> = ({
  profile,
  postItCards: initialPostItCards,
  currentPage,
  onPageChange,
}) => {
  const [postItCards, setPostItCards] = useState(initialPostItCards);
  const cardsPerPage = 12;

  const handleDelete = (index: number) => {
    const newPostItCards = [...postItCards];
    newPostItCards.splice(index, 1);
    setPostItCards(newPostItCards);
  };

  const renderPostItCards = () => {
    const startIdx = (currentPage - 1) * cardsPerPage;
    const endIdx = startIdx + cardsPerPage;
    const cardsToShow = postItCards.slice(startIdx, endIdx);

    const cards = cardsToShow.map((card, index) => (
      <PostItCard
        key={startIdx + index}
        contents={card.contents}
        name={card.name}
        color={card.color as never}
        onDelete={() => handleDelete(startIdx + index)}
      />
    ));

    return cards;
  };

  const totalPagesCalculated = Math.ceil(
    (postItCards.length + 1) / cardsPerPage
  ); // +1 for PostItPlusCard

  return (
    <div className='relative flex flex-col items-center p-12'>
      <div className='absolute inset-0 z-0'>
        <Glass
          variant='desktop' // 적절한 variant를 선택하세요
          currentPage={currentPage}
          totalPages={totalPagesCalculated}
          onPageChange={onPageChange}
          showPageIndicator={true}
        />
      </div>
      <div className='relative z-10 w-full max-w-screen-lg p-6 bg-gray-100 rounded-lg shadow-md'>
        <div className='flex'>
          <div className='flex-shrink-0 mr-4'>
            <ProfileCard
              name={profile.name}
              age={profile.age}
              date={profile.date}
              description={profile.description}
              tagList={profile.tagList}
            />
          </div>
          <div className='flex-grow'>
            <div className='grid grid-cols-4 gap-4'>
              {renderPostItCards()}
              {currentPage === totalPagesCalculated && (
                <PostItPlusCard key='plus' />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheerMessage;
