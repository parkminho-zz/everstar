import React, { useState, useEffect } from 'react';
import { useFetchMemorialBooks, useUpdateMemorialBookOpenStatus } from 'hooks/useMemorialBooks';
import { DepressionSurvey } from 'components/organics/DepressionSurvey/DepressionSurvey';
import { MainActionComponent } from 'components/organics/MainActionComponent/MainActionComponent';
import { ProfileModal } from 'components/organics/ProfileModal/ProfileModal';

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
  isOwner: boolean;
}

export const EverStarMain: React.FC<EverStarMainProps> = ({
  petProfile,
  memorialBookProfile,
  petId,
  isOwner,
}) => {
  const { data, refetch } = useFetchMemorialBooks(petId); // Fetch memorial book profile
  const [toggleStatus, setToggleStatus] = useState<'on' | 'off' | undefined>(
    memorialBookProfile?.isOpen ? 'on' : 'off',
  );
  const [isModalOpen, setIsModalOpen] = useState(
    petProfile?.questIndex === 50 && !memorialBookProfile?.isActive && isOwner,
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const { mutate: updateMemorialBookStatus } = useUpdateMemorialBookOpenStatus({
    onSuccess: () => {
      refetch(); // Refetch the memorial book profile after updating the open status
    },
  });

  const handleSurveySubmitSuccess = async () => {
    setIsModalOpen(false);

    await refetch(); // Refetch the memorial book profile after submitting the survey

    // Get the updated data
    const updatedMemorialBookProfile = data?.data || memorialBookProfile;

    // Display psychologicalTestResult as an alert
    if (updatedMemorialBookProfile?.psychologicalTestResult) {
      alert(updatedMemorialBookProfile.psychologicalTestResult);
    }
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true); // 프로필 클릭 시 모달 열기
  };

  // useEffect hook to refetch memorialBookProfile on component mount
  useEffect(() => {
    refetch(); // Fetch the memorial book profile when component mounts
  }, [refetch]);

  if (!petProfile) {
    return <div>Loading...</div>;
  }

  const updatedMemorialBookProfile = data?.data || memorialBookProfile;

  return (
    <div className="flex items-center justify-center flex-grow">
      {isModalOpen && updatedMemorialBookProfile && petProfile?.questIndex === 50 && isOwner && (
        <div style={{ position: 'relative', zIndex: 1000 }}>
          <DepressionSurvey
            onSubmitSuccess={handleSurveySubmitSuccess}
            memorialBookId={updatedMemorialBookProfile.id} // memorialBookId를 직접 전달
          />
        </div>
      )}

      <MainActionComponent
        type="everstar"
        profileImageUrl={petProfile.avatarUrl}
        fill={petProfile.questIndex}
        name={petProfile.name}
        age={petProfile.age}
        description={petProfile.description}
        memorialBookProfile={updatedMemorialBookProfile}
        toggleStatus={toggleStatus}
        onToggleChange={(status) => {
          setToggleStatus(status);
          if (updatedMemorialBookProfile) {
            updateMemorialBookStatus({
              petId,
              memorialBookId: updatedMemorialBookProfile.id,
              isOpen: status === 'on',
            });
          }
        }}
        isOwner={isOwner}
        onProfileClick={handleProfileClick} // 프로필 클릭 핸들러 추가
      />

      <ProfileModal
        avatarSrc={petProfile.avatarUrl}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)} // 프로필 모달 닫기
        profileData={petProfile}
        isOwner={isOwner}
        onPencilClick={() => console.log('Edit profile clicked')} // PencilIcon 클릭 시 처리할 핸들러
      />
    </div>
  );
};
