import React from 'react';
import { ProfileCard } from 'components/molecules/cards/ProfileCard/ProfileCard';
import { PostItCard } from 'components/molecules/cards/PostItCard/PostItCard';
import { PostItPlusCard } from 'components/molecules/cards/PostItPlusCard/PostItPlusCard';
import { PageIndicator } from 'components/molecules/PageIndicator/PageIndicator';

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
  postItPlusCards: Array<{ contents: string; name: string; color: string }>;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const CheerMessage: React.FC<CheerMessageProps> = ({
  profile,
  postItCards,
  postItPlusCards,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPostItCards = () => {
    return postItCards.map((card, index) => (
      <PostItCard
        key={index}
        contents={card.contents}
        name={card.name}
        color={card.color as never}
      />
    ));
  };

  const renderPostItPlusCards = () => {
    return postItPlusCards.map((_, index) => (
      <PostItPlusCard key={`plus-${index}`} />
    ));
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <div className='w-full max-w-screen-lg p-6 bg-gray-100 rounded-lg shadow-md'>
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
          <div className='grid flex-grow grid-cols-4 gap-4'>
            {renderPostItCards()}
            {renderPostItPlusCards()}
          </div>
        </div>
        <div className='mt-4'>
          <PageIndicator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CheerMessage;
