import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Select } from 'components/molecules/input/Select';

export interface SignUpFormProps {
  headerText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  headerText,
  smallButtonText,
  showPrimaryButton = true,
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
    if (value !== null) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md">
        <ModalHeader text={headerText} showLeftIcon={true} />

        <InputField
          label="이름"
          showLabel={true}
          showValidationText={false}
          starshow={false}
          state="default"
          text={formData.name}
          showCheckIcon={false}
          className=""
          onChange={(e) => handleInputChange('name', e.target.value)}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">생년월일</label>
          <DatePicker
            selected={formData.birthdate}
            onChange={(date) => handleInputChange('birthdate', date)}
            dateFormat="yyyy-MM-dd"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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

        <InputField
          label="이메일"
          showLabel={true}
          showValidationText={false}
          starshow={false}
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
          starshow={false}
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
              icon={null}
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
