import React, { useState } from 'react';
import { ProfileCard } from 'components/molecules/cards/ProfileCard/ProfileCard';
import { PostItCard } from 'components/molecules/cards/PostItCard/PostItCard';
import { PostItPlusCard } from 'components/molecules/cards/PostItPlusCard/PostItPlusCard';
import { Glass } from 'components/molecules/Glass/Glass';
import { IntroduceWrite } from 'components/organics/CheerMessage/IntroduceWrite';
import { CheerColorSelect } from 'components/organics/CheerMessage/CheerColorSelect';
import { CheerMessageWrite } from 'components/organics/CheerMessage/CheerMessageWrite';
import { useFetchCheeringPetDelete } from 'hooks/useEverStar';

export interface CheerMessageProps {
  profile: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarUrl: string;
  };
  postItCards: Array<{
    contents: string;
    name: string;
    color: string;
    petId: number;
    cheeringMessageId: number;
  }>;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const CheerMessage: React.FC<CheerMessageProps> = ({
  profile,
  postItCards: initialPostItCards,
  currentPage,
  onPageChange,
}) => {
  const [postItCards, setPostItCards] = useState(initialPostItCards);
  const [isIntroduceWriteModalOpen, setIntroduceWriteModalOpen] = useState(false);
  const [isCheerColorSelectModalOpen, setCheerColorSelectModalOpen] = useState(false);
  const [isCheerMessageWriteModalOpen, setCheerMessageWriteModalOpen] = useState(false);

  const cardsPerPage = 12;

  const { mutate: deleteCheeringPet } = useFetchCheeringPetDelete();

  const handleDelete = (index: number, petId: number, cheeringMessageId: number) => {
    deleteCheeringPet(
      { petId, cheeringMessageId },
      {
        onSuccess: () => {
          const newPostItCards = [...postItCards];
          newPostItCards.splice(index, 1);
          setPostItCards(newPostItCards);
        },
        onError: (error) => {
          console.error('삭제 실패:', error);
        },
      },
    );
  };

  const handlePencilClick = () => {
    setIntroduceWriteModalOpen(true);
  };

  const handleCloseIntroduceWriteModal = () => {
    setIntroduceWriteModalOpen(false);
  };

  const handleVerifyIntroduceWrite = () => {
    setIntroduceWriteModalOpen(false);
  };

  const handlePostItPlusClick = () => {
    setCheerColorSelectModalOpen(true);
  };

  const handleCloseCheerColorSelectModal = () => {
    setCheerColorSelectModalOpen(false);
  };

  const handleVerifyCheerColorSelect = () => {
    setCheerColorSelectModalOpen(false);
    setCheerMessageWriteModalOpen(true);
  };

  const handleCloseCheerMessageWriteModal = () => {
    setCheerMessageWriteModalOpen(false);
  };

  const handleVerifyCheerMessageWrite = () => {
    setCheerMessageWriteModalOpen(false);
  };

  const renderPostItCards = () => {
    const startIdx = (currentPage - 1) * cardsPerPage;
    const endIdx = startIdx + cardsPerPage;
    const cardsToShow = postItCards.slice(startIdx, endIdx);

    return cardsToShow.map((card, index) => (
      <PostItCard
        key={startIdx + index}
        contents={card.contents}
        name={card.name}
        color={card.color as never}
        onDelete={() => handleDelete(startIdx + index, card.petId, card.cheeringMessageId)}
      />
    ));
  };

  const totalPagesCalculated = Math.ceil((postItCards.length + 1) / cardsPerPage); // +1 for PostItPlusCard

  return (
    <div className="relative flex flex-col items-center p-12">
      <div className="absolute inset-0 z-0">
        <Glass
          currentPage={currentPage}
          totalPages={totalPagesCalculated}
          onPageChange={onPageChange}
          showPageIndicator={true}
          className="w-full h-auto sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5"
        />
      </div>
      <div className="relative z-10 w-full max-w-screen-lg p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="flex">
          <div className="flex-shrink-0 mr-4">
            <ProfileCard
              name={profile.name}
              age={profile.age}
              date={profile.date}
              description={profile.description}
              tagList={profile.tagList}
              onPencilClick={handlePencilClick}
            />
          </div>
          <div className="flex-grow">
            <div className="grid grid-cols-4 gap-4">
              {renderPostItCards()}
              {currentPage === totalPagesCalculated && (
                <PostItPlusCard key="plus" onClick={handlePostItPlusClick} />
              )}
            </div>
          </div>
        </div>
      </div>

      <IntroduceWrite
        isOpen={isIntroduceWriteModalOpen}
        onClose={handleCloseIntroduceWriteModal}
        onVerify={handleVerifyIntroduceWrite}
        text="소개글을 입력하세요"
        onResend={() => {}}
      />

      <CheerColorSelect
        isOpen={isCheerColorSelectModalOpen}
        onClose={handleCloseCheerColorSelectModal}
        onVerify={handleVerifyCheerColorSelect}
        text="색상 정보를 선택하세요"
        onResend={() => {}}
      />

      <CheerMessageWrite
        isOpen={isCheerMessageWriteModalOpen}
        onClose={handleCloseCheerMessageWriteModal}
        onVerify={handleVerifyCheerMessageWrite}
        text="응원 메시지를 입력하세요"
        onResend={() => {}}
      />
    </div>
  );
};
