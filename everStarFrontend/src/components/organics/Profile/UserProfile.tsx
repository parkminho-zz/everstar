// src/components/organics/Profile/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Tab } from 'components/molecules/Tab/Tab';
import { InputField } from 'components/organics/input/InputFields';
import { Select } from 'components/molecules/input/Select';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { Tag } from 'components/atoms/buttons/Tag';

export interface PetInfo {
  id: number;
  userId: number;
  name: string;
  age: number;
  memorialDate: string;
  species: string;
  gender: string;
  relationship: string;
  profileImageUrl: string;
  personalities: string[];
}

export interface UserProfileProps {
  headerText: string;
  largeButtonText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
  userInfo: {
    name: string;
    birthdate: string;
    gender: string;
    email: string;
    phone: string;
  };
  petOptions: string[];
  petInfo: { [key: string]: PetInfo };
  onPetSelect: (name: string) => void;
  onLeftIconClick?: () => void; // 이전 페이지로 이동하는 핸들러 prop 추가
}

export const UserProfile: React.FC<UserProfileProps> = ({
  headerText,
  smallButtonText,
  userInfo,
  petOptions,
  petInfo,
  onPetSelect,
  onLeftIconClick, // prop 추가
}) => {
  const [activeTab, setActiveTab] = useState<'one' | 'two'>('one');
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [currentPet, setCurrentPet] = useState<PetInfo | null>(null);

  useEffect(() => {
    if (selectedPet) {
      onPetSelect(selectedPet);
      setCurrentPet(petInfo[selectedPet]);
    }
  }, [selectedPet, petInfo, onPetSelect]);

  const handleButtonClick = () => {
    console.log('Primary Button Clicked');
  };

  return (
    <div className='flex justify-center p-6 '>
      <div className='flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md'>
        <ModalHeader
          text={headerText}
          showLeftIcon={true}
          onLeftIconClick={onLeftIconClick}
        />
        <Tab
          row='two'
          activeTab={activeTab}
          className='mb-4'
          onTabClick={(tab) => setActiveTab(tab as 'one' | 'two')}
        />

        {activeTab === 'one' ? (
          <>
            <InputField
              label='이름'
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state='disable'
              text={userInfo.name}
              showCheckIcon={false}
              className=''
            />
            <InputField
              label='생년월일'
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state='disable'
              text={userInfo.birthdate}
              showCheckIcon={false}
              className=''
            />
            <InputField
              label='성별'
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state='disable'
              text={userInfo.gender}
              showCheckIcon={false}
              className=''
            />
            <InputField
              label='이메일'
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state='disable'
              text={userInfo.email}
              showCheckIcon={false}
              className=''
            />
            <InputField
              label='전화번호'
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state='default'
              text={userInfo.phone}
              showCheckIcon={true}
              className=''
              placeholder='전화번호를 입력해 주세요'
            />
            <div className='flex justify-end w-full'>
              <PrimaryButton
                theme='white'
                size='small'
                onClick={handleButtonClick}
                disabled={false}
                icon={null}
                hug={true}
              >
                {smallButtonText}
              </PrimaryButton>
            </div>
          </>
        ) : (
          <>
            <Select
              className='custom-class'
              options={petOptions}
              title='반려동물을 선택해주세요'
              starshow={false}
              onOptionSelect={(option) => setSelectedPet(option as string)}
              infoText='반려동물을 선택해주세요'
              showLabel={false}
            />
            {currentPet && (
              <>
                <Avatar
                  size='medium'
                  src={currentPet.profileImageUrl}
                  name={currentPet.name}
                />
                <PrimaryButton
                  theme='white'
                  size='medium'
                  onClick={() => console.log('Change profile picture')}
                  disabled={false}
                  icon={null}
                >
                  프로필 사진 변경
                </PrimaryButton>
                <InputField
                  label='이름'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state='disable'
                  text={currentPet.name}
                  showCheckIcon={false}
                  className=''
                />
                <InputField
                  label='나이'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state='disable'
                  text={currentPet.age.toString()}
                  showCheckIcon={false}
                  className=''
                />
                <InputField
                  label='성별'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state='disable'
                  text={currentPet.gender}
                  showCheckIcon={false}
                  className=''
                />
                <InputField
                  label='종류'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state='disable'
                  text={currentPet.species}
                  showCheckIcon={false}
                  className=''
                />
                <InputField
                  label='관계'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state='disable'
                  text={currentPet.relationship}
                  showCheckIcon={false}
                  className=''
                />
                <InputField
                  label='기일'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state='disable'
                  text={new Date(currentPet.memorialDate).toLocaleDateString()}
                  showCheckIcon={false}
                  className=''
                />
                <div className='flex justify-center space-x-5'>
                  {currentPet.personalities.map((trait, index) => (
                    <Tag key={index} className='greyscalewhite'>
                      #{trait}
                    </Tag>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
