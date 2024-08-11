import React, { useEffect, useState } from 'react';
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
  const [localToggleStatus, setLocalToggleStatus] = useState<'on' | 'off' | undefined>(
    toggleStatus,
  );

  useEffect(() => {
    if (toggleStatus !== localToggleStatus) {
      setLocalToggleStatus(toggleStatus);
    }
  }, [toggleStatus]);

  const handleButtonClick = () => {
    navigate('/earth');
  };

  const handleViewMemorialBookClick = () => {
    if (memorialBookProfile?.isActive && memorialBookProfile?.isOpen) {
      navigate(`/everstar/${petId}/memorialbook/${memorialBookProfile.id}`);
    }
  };

  const handleToggleChange = (status: 'on' | 'off') => {
    if (status !== localToggleStatus) {
      setLocalToggleStatus(status);
      if (handleToggle) {
        handleToggle(status);
      }
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
          toggleStatus={localToggleStatus}
          onToggleChange={handleToggleChange}
          showToggle={handleToggle !== undefined} // 내가 아닌 경우 또는 활성화되지 않은 경우 토글 버튼 숨기기
          isActive={memorialBookProfile?.isActive} // MemorialBook의 활성화 상태 전달
        />
      </div>
    </div>
  );
};
