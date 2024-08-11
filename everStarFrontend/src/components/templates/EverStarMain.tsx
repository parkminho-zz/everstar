import React, { useState } from 'react';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';
import { ViewMemorialBook } from 'components/organics/ViewMemorialBook/ViewMemorialBook';
import { useNavigate } from 'react-router-dom';
import { useUpdateMemorialBookOpenStatus } from 'hooks/useMemorialBooks';
import { DepressionSurvey } from 'components/organics/DepressionSurvey/DepressionSurvey';

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
  isOwner: boolean; // 새로운 prop 추가
}

export const EverStarMain: React.FC<EverStarMainProps> = ({
  petProfile,
  memorialBookProfile,
  petId,
  isOwner,
}) => {
  const navigate = useNavigate();
  const [toggleStatus, setToggleStatus] = useState<'on' | 'off' | undefined>(
    memorialBookProfile?.isOpen ? 'on' : 'off',
  );
  const [isModalOpen, setIsModalOpen] = useState(
    petProfile?.questIndex === 50 && !memorialBookProfile?.isActive && isOwner,
  );

  const { mutate: updateMemorialBookStatus } = useUpdateMemorialBookOpenStatus({
    onSuccess: (data, variables) => {
      setToggleStatus(variables.isOpen ? 'on' : 'off');
    },
  });

  const handleButtonClick = () => {
    navigate('/earth');
  };

  const handleViewMemorialBookClick = () => {
    if (memorialBookProfile) {
      navigate(`/everstar/${petId}/memorialbook/${memorialBookProfile.id}`);
    }
  };

  const handleToggleChange = (status: 'on' | 'off') => {
    if (status !== toggleStatus && memorialBookProfile) {
      setToggleStatus(status);
      updateMemorialBookStatus({
        petId,
        memorialBookId: memorialBookProfile.id,
        isOpen: status === 'on',
      });
    }
  };

  const handleSurveySubmitSuccess = () => {
    setIsModalOpen(false); // 설문 제출 성공 시 모달을 닫음
  };

  if (!petProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isModalOpen && <DepressionSurvey onSubmitSuccess={handleSurveySubmitSuccess} />}
      <ProgressCard
        title={petProfile.name}
        fill={petProfile.questIndex}
        buttonTheme="white"
        buttonSize="large"
        buttonDisabled={false}
        buttonText="지구별로 가기"
        buttonIcon="SmallEarthImg"
        onButtonClick={handleButtonClick}
        showMusicControl={false}
        className=""
      />
      <div className="flex flex-col items-center mt-20">
        <ViewMemorialBook
          onClick={handleViewMemorialBookClick}
          toggleStatus={toggleStatus}
          onToggleChange={handleToggleChange}
          isActive={memorialBookProfile?.isActive}
          isOpen={memorialBookProfile?.isOpen}
          isOwner={isOwner} // isOwner 값을 전달
        />
      </div>
    </div>
  );
};
