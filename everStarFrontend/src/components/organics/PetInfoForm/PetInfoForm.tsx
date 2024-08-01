import React, { useState } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Select } from 'components/molecules/input/Select';
import { DateInputField } from 'components/organics/input/DateInputField';

export interface PetInfoFormProps {
  headerText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
  text: string;
}

export const PetInfoForm: React.FC<PetInfoFormProps> = ({
  headerText,
  smallButtonText,
  showPrimaryButton = true,
  text,
}) => {
  const [formData, setFormData] = useState({
    photo: null as File | null,
    gender: '',
    birthYear: '',
    passingDate: null as Date | null,
    relationship: '',
    type: '',
  });

  const handleButtonClick = () => {
    console.log('Form Submitted', formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | Date | null | File) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleInputChange('photo', event.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md">
        <ModalHeader text={headerText} showLeftIcon={true} />
        <div className="flex flex-col w-full">
          <div
            className="left-0 text-left [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]"
            dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }}
          />
        </div>

        <div className="flex flex-col items-start w-full gap-2">
          <PrimaryButton
            theme="white"
            size="large"
            onClick={() => document.getElementById('photoInput')?.click()}
            disabled={false}
            icon={null}
            hug={false}
          >
            이미지 추가
          </PrimaryButton>
          <input
            type="file"
            id="photoInput"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
          {formData.photo && <span className="text-sm text-gray-600">{formData.photo.name}</span>}
        </div>

        <Select
          className=""
          options={['남성', '여성']}
          title="성별을 선택하세요"
          showLabel={true}
          starshow={false}
          onOptionSelect={(option) => handleInputChange('gender', option as string)}
          infoText=""
          showIcon={true}
        />

        <Select
          className=""
          options={Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString())}
          title="태어난 년도를 선택하세요"
          showLabel={true}
          starshow={false}
          onOptionSelect={(option) => handleInputChange('birthYear', option as string)}
          infoText=""
          showIcon={true}
        />

        <DateInputField
          label="떠난 날"
          showLabel={true}
          showValidationText={false}
          starshow={false}
          state="default"
          date={formData.passingDate}
          placeholder="떠난 날을 선택하세요"
          onChange={(date) => handleInputChange('passingDate', date)}
        />

        <Select
          className=""
          options={['엄마', '아빠', '언니', '누나', '형', '오빠', '이모', '삼촌']}
          title="나와의 관계를 선택하세요"
          showLabel={true}
          starshow={false}
          onOptionSelect={(option) => handleInputChange('relationship', option as string)}
          infoText=""
          showIcon={true}
        />

        <InputField
          label="종류"
          showLabel={true}
          showValidationText={false}
          starshow={false}
          state="default"
          text={formData.type}
          showCheckIcon={false}
          className=""
          onChange={(e) => handleInputChange('type', e.target.value)}
        />

        {showPrimaryButton && (
          <div className="flex justify-end w-full">
            <PrimaryButton
              theme="white"
              size="small"
              onClick={handleButtonClick}
              disabled={false}
              icon={true}
              hug={true}
            >
              {smallButtonText}
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
