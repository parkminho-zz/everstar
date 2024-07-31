import React, { useState, useEffect } from "react";
import { ModalHeader } from "components/molecules/ModalHeader/ModalHeader";
import { PrimaryButton } from "components/atoms/buttons/PrimaryButton";
import { Tab } from "components/molecules/Tab/Tab";
import { InputField } from "components/organics/input/InputField";
import { Select } from "components/molecules/input/Select";
import { Avatar } from "components/atoms/symbols/Avatar/Avatar";
import { Lable } from "components/atoms/texts/Lable";
import { Tag } from "components/atoms/buttons/Tag";

export interface PetInfo {
  name: string;
  birthdate: string;
  gender: string;
  breed: string;
  color: string;
  personality: string[];
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
}

export const UserProfile: React.FC<UserProfileProps> = ({
  headerText,
  smallButtonText,
  userInfo,
  petOptions,
  petInfo,
}) => {
  const [activeTab, setActiveTab] = useState<"one" | "two">("one");
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [currentPet, setCurrentPet] = useState<PetInfo | null>(null);

  const handleButtonClick = () => {
    console.log("Primary Button Clicked");
  };

  useEffect(() => {
    if (selectedPet) {
      setCurrentPet(petInfo[selectedPet]);
    }
  }, [selectedPet, petInfo]);

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <div className="flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md">
        {/* Modal Header */}
        <ModalHeader text={headerText} showLeftIcon={true} />

        {/* Tabs */}
        <Tab
          row="two"
          activeTab={activeTab}
          className="mb-4"
          onTabClick={(tab) => setActiveTab(tab as "one" | "two")}
        />

        {/* Content based on active tab */}
        {activeTab === "one" ? (
          <>
            <InputField
              label="이름"
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state="disable"
              text={userInfo.name}
              showCheckIcon={false}
              className=""
            />
            <InputField
              label="생년월일"
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state="disable"
              text={userInfo.birthdate}
              showCheckIcon={false}
              className=""
            />
            <InputField
              label="성별"
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state="disable"
              text={userInfo.gender}
              showCheckIcon={false}
              className=""
            />
            <InputField
              label="이메일"
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state="disable"
              text={userInfo.email}
              showCheckIcon={false}
              className=""
            />
            <Select
              className="custom-class"
              options={Array.from({ length: 17 }, (_, i) => `${6 + i}:00`)}
              title="10:00"
              starshow={true}
              onOptionSelect={(option) =>
                console.log("Selected option:", option)
              }
              infoText="06:00~22:00 가능"
            />
            <InputField
              label="전화번호"
              showLabel={true}
              showValidationText={false}
              starshow={false}
              state="default"
              text={userInfo.phone}
              showCheckIcon={true}
              className=""
              placeholder="전화번호를 입력해 주세요"
            />
            {/* Small Primary Button */}
            <div className="flex justify-end w-full">
              <PrimaryButton
                theme="white"
                size="small"
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
                <Avatar size="medium" name={currentPet.name} />
                <PrimaryButton
                  theme="white"
                  size="medium"
                  onClick={() => console.log("Change profile picture")}
                  disabled={false}
                  icon={null}
                >
                  프로필 사진 변경
                </PrimaryButton>
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
                  label="생년월일"
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state="disable"
                  text={currentPet.birthdate}
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
                  text={currentPet.breed}
                  showCheckIcon={false}
                  className=""
                />
                <InputField
                  label="색상"
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  state="disable"
                  text={currentPet.color}
                  showCheckIcon={false}
                  className=""
                />
                <Lable
                  prop="성격"
                  show={false}
                  font="default"
                  className="self-start"
                />
                <div className="flex justify-between w-full">
                  {currentPet.personality.map((trait, index) => (
                    <Tag key={index} className="greyscalewhite">
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
