import React, { useState } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Select } from 'components/molecules/input/Select';
import { DateInputField } from 'components/organics/input/DateInputField';

export interface SignUpFormProps {
  headerText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
  text: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  headerText,
  smallButtonText,
  showPrimaryButton = true,
  text,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: new Date(),
    gender: '',
    email: '',
    phone: '',
  });

  const handleButtonClick = () => {
    console.log('Form Submitted', formData);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | Date | null) => {
    setFormData({
      ...formData,
      [field]: value,
    });
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
        <InputField
          label="이름"
          showLabel={true}
          showValidationText={false}
          starshow={true}
          state="default"
          text={formData.name}
          showCheckIcon={false}
          className=""
          onChange={(e) => handleInputChange('name', e.target.value)}
        />

        <DateInputField
          label="생년월일"
          showLabel={true}
          showValidationText={false}
          starshow={true}
          state="default"
          date={formData.birthdate}
          placeholder="생년월일을 선택하세요"
          onChange={(date) => handleInputChange('birthdate', date)}
        />

        <Select
          className=""
          options={['남성', '여성']}
          title="성별을 선택하세요"
          showLabel={true}
          starshow={true}
          onOptionSelect={(option) => handleInputChange('gender', option as string)}
          infoText=""
          showIcon={true}
        />

        <InputField
          label="이메일"
          showLabel={true}
          showValidationText={false}
          starshow={true}
          state="default"
          text={formData.email}
          showCheckIcon={false}
          className=""
          onChange={(e) => handleInputChange('email', e.target.value)}
        />

        <InputField
          label="전화번호"
          showLabel={true}
          showValidationText={false}
          starshow={true}
          state="default"
          text={formData.phone}
          showCheckIcon={true}
          className=""
          placeholder="전화번호를 입력해 주세요"
          onChange={(e) => handleInputChange('phone', e.target.value)}
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
