import React from 'react';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';
import { ViewMemorialBook } from 'components/organics/ViewMemorialBook/ViewMemorialBook';
import { useNavigate } from 'react-router-dom';

interface EverStarMainProps {
  petProfile: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarUrl: string;
    questIndex: number;
  } | null;
  buttonDisabled: boolean;
  memorialBookProfile: {
    id: number;
    psychologicalTestResult: string | null;
    isOpen: boolean;
    isActive: boolean;
  } | null;
  petId: number;
  handleToggle?: (status: 'off' | 'on') => void;
  toggleStatus?: 'on' | 'off' | undefined;
}

export const EverStarMain: React.FC<EverStarMainProps> = ({
  petProfile,
  buttonDisabled,
  memorialBookProfile,
  petId,
  handleToggle,
  toggleStatus,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/earth');
  };

  const handleViewMemorialBookClick = () => {
    if (memorialBookProfile?.isActive && memorialBookProfile?.isOpen) {
      navigate(`/everstar/${petId}/memorialbook/${memorialBookProfile.id}`);
    }
  };

  if (!petProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ProgressCard
        title={petProfile.name}
        fill={petProfile.questIndex}
        buttonTheme="white"
        buttonSize="large"
        buttonDisabled={false}
        buttonText={'지구별로 가기'}
        buttonIcon="SmallEarthImg"
        onButtonClick={handleButtonClick}
        showMusicControl={false}
        className=""
      />
      <div className="flex flex-col items-center mt-20">
        <ViewMemorialBook
          theme={buttonDisabled ? 'white' : 'focus'}
          size="large"
          disabled={buttonDisabled}
          onClick={handleViewMemorialBookClick}
          BookVariant="book-close"
          showIcon={false}
          toggleStatus={toggleStatus}
          onToggleChange={handleToggle}
        >
          {buttonDisabled
            ? '메모리얼북을 열람하실 수 없습니다.'
            : memorialBookProfile?.isActive
              ? '메모리얼북 열람하기'
              : '아직 활성화되지 않았습니다'}
        </ViewMemorialBook>
      </div>
    </div>
  );
};
