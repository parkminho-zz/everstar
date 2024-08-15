import React, { useState } from 'react';
import { useUpdateMemorialBookOpenStatus } from 'hooks/useMemorialBooks';
import { DepressionSurvey } from 'components/organics/DepressionSurvey/DepressionSurvey';
import { MainActionComponent } from 'components/organics/MainActionComponent/MainActionComponent'; // MainActionComponent 임포트
import { ProfileModal } from 'components/organics/ProfileModal/ProfileModal';
import { IntroduceWrite } from 'components/organics/CheerMessage/IntroduceWrite';
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
  const [toggleStatus, setToggleStatus] = useState<'on' | 'off' | undefined>(
    memorialBookProfile?.isOpen ? 'on' : 'off'
  );
  const [isModalOpen, setIsModalOpen] = useState(
    petProfile?.questIndex === 50 && !memorialBookProfile?.isActive && isOwner
  );

  const [isIntroduceWriteModalOpen, setIntroduceWriteModalOpen] =
    useState(false);

  const { mutate: updateMemorialBookStatus } = useUpdateMemorialBookOpenStatus({
    onSuccess: (_, variables) => {
      setToggleStatus(variables.isOpen ? 'on' : 'off');
    },
  });
  // const [description, setDescription] = useState(petProfile?.description || '');

  // const handleVerifyIntroduceWrite = () => {
  //   console.log(1);
  //   setIntroduceWriteModalOpen(false);
  // };

  const handleSurveySubmitSuccess = () => {
    setIsModalOpen(false);
  };

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleProfileClick = () => {
    // console.log(description);
    setIsProfileModalOpen(true); // 프로필 클릭 시 모달 열기
  };

  const handleCloseIntroduceWriteModal = () => {
    setIntroduceWriteModalOpen(false);
  };

  console.log(petProfile);
  //에러
  if (!petProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {isModalOpen && (
        <DepressionSurvey onSubmitSuccess={handleSurveySubmitSuccess} />
      )}

      <MainActionComponent
        type='everstar'
        profileImageUrl={petProfile.avatarUrl}
        fill={petProfile.questIndex}
        name={petProfile.name}
        age={petProfile.age}
        description={petProfile.description}
        memorialBookProfile={memorialBookProfile}
        toggleStatus={toggleStatus}
        onToggleChange={(status) => {
          setToggleStatus(status);
          if (memorialBookProfile) {
            updateMemorialBookStatus({
              petId,
              memorialBookId: memorialBookProfile.id,
              isOpen: status === 'on',
            });
          }
        }}
        isOwner={isOwner}
        onProfileClick={handleProfileClick} // 프로필 클릭 핸들러 추가
      />

      <IntroduceWrite
        isOpen={isIntroduceWriteModalOpen}
        onClose={handleCloseIntroduceWriteModal}
        // onVerify={handleVerifyIntroduceWrite}
        text='소개글을 입력하세요'
        onResend={() => {}}
      />

      <ProfileModal
        avatarSrc={petProfile.avatarUrl}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)} // 프로필 모달 닫기
        profileData={petProfile}
        isOwner={isOwner}
        onPencilClick={() => {
          setIntroduceWriteModalOpen(true);
          setIsProfileModalOpen(false);
        }}
      />
    </div>
  );
};
