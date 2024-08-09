// src/components/organics/Profile/PetInfoTab.tsx
import React, { useState, useEffect } from 'react';
import { Select } from 'components/molecules/input/Select';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Tag } from 'components/atoms/buttons/Tag';
import { useUpdateProfileImage } from 'hooks/usePets';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';

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

export interface PetInfoTabProps {
  petOptions: string[];
  petInfo: { [key: string]: PetInfo };
  onPetSelect: (name: string) => void;
}

export const PetInfoTab: React.FC<PetInfoTabProps> = ({ petOptions, petInfo, onPetSelect }) => {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [currentPet, setCurrentPet] = useState<PetInfo | null>(null);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const { mutate: updateProfileImage } = useUpdateProfileImage(currentPet?.id || 0, token);

  useEffect(() => {
    if (selectedPet) {
      onPetSelect(selectedPet);
      setCurrentPet(petInfo[selectedPet]);
    }
  }, [selectedPet, petInfo, onPetSelect]);

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && currentPet) {
      const formData = new FormData();
      formData.append('profileImage', event.target.files[0]);
      updateProfileImage(formData);
    }
  };

  return (
    <>
      <Select
        className="custom-class"
        options={petOptions}
        title="반려동물을 선택해주세요"
        starshow={false}
        onOptionSelect={(option) => setSelectedPet(option as string)}
        infoText="반려동물을 선택해주세요"
        showLabel={false}
      />
      {currentPet && (
        <>
          <Avatar size="medium" src={currentPet.profileImageUrl} name={currentPet.name} />
          <PrimaryButton
            theme="white"
            size="medium"
            onClick={() => document.getElementById('profileImageInput')?.click()}
            disabled={false}
            icon={null}
          >
            프로필 사진 변경
          </PrimaryButton>
          <input
            type="file"
            id="profileImageInput"
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
          <InputField
            label="이름"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={currentPet.name}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="나이"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={currentPet.age.toString()}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="성별"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={currentPet.gender}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="종류"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={currentPet.species}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="관계"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={currentPet.relationship}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="기일"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={new Date(currentPet.memorialDate).toLocaleDateString()}
            showCheckIcon={false}
            className=""
          />
          <div className="flex justify-center space-x-5">
            {currentPet.personalities.map((trait, index) => (
              <Tag key={index} className="greyscalewhite">
                #{trait}
              </Tag>
            ))}
          </div>
        </>
      )}
    </>
  );
};
