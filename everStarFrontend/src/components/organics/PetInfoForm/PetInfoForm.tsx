import React, { useState, useEffect } from 'react';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Select } from 'components/molecules/input/Select';
import { DateInputField } from 'components/organics/input/DateInputField';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';

export interface PetInfoFormProps {
  headerText: string;
  smallButtonText: string; // 추가
  showPrimaryButton?: boolean;
  text: string;
  onClose: () => void;
  onSubmit: (formData: PetFormData) => void;
  relationshipOptions: string[];
}

export interface PetFormData {
  name: string;
  age: number;
  memorialDate: Date | null;
  species: string;
  gender: string;
  relationship: string;
  profileImageUrl: File | null;
  introduction: string;
  questIndex: number;
  personality: string[];
}

export const PetInfoForm: React.FC<PetInfoFormProps> = ({
  headerText,
  showPrimaryButton = true,
  text,
  onClose,
  onSubmit,
  relationshipOptions,
}) => {
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    age: 0,
    memorialDate: null,
    species: '',
    gender: '',
    relationship: '',
    profileImageUrl: null,
    introduction: '',
    questIndex: 1,
    personality: [], // 초기에는 빈 배열로 설정
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [dynamicRelationshipOptions, setDynamicRelationshipOptions] =
    useState<string[]>(relationshipOptions);

  useEffect(() => {
    const {
      name,
      age,
      memorialDate,
      species,
      gender,
      relationship,
      profileImageUrl,
      introduction,
    } = formData;
    setIsFormValid(
      name !== '' &&
        age !== 0 &&
        memorialDate !== null &&
        species !== '' &&
        gender !== '' &&
        relationship !== '' &&
        profileImageUrl !== null &&
        introduction !== '',
    );
  }, [formData]);

  const handleButtonClick = () => {
    console.log('Form Submitted', formData);
    onSubmit({ ...formData, questIndex: 1 }); // 고정값으로 설정
  };

  const handleInputChange = (
    field: keyof PetFormData,
    value: string | number | Date | null | File | string[],
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (field === 'gender') {
      if (value === '남성') {
        setDynamicRelationshipOptions([
          '형',
          '누나',
          '아빠',
          '엄마',
          '이모',
          '삼촌',
          '친구',
        ]);
      } else if (value === '여성') {
        setDynamicRelationshipOptions([
          '오빠',
          '언니',
          '아빠',
          '엄마',
          '이모',
          '삼촌',
          '친구',
        ]);
      } else {
        setDynamicRelationshipOptions(relationshipOptions);
      }
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleInputChange('profileImageUrl', event.target.files[0]);
    }
  };

  return (
    <div className='flex justify-center p-6'>
      <div className='flex flex-col items-center w-full max-w-lg gap-8 p-5 bg-white rounded-lg shadow-md z-20'>
        <ModalHeader text={headerText} onLeftIconClick={onClose} />
        <div className='flex flex-col items-center w-full gap-8 p-5'>
          <div className='flex flex-col w-full'>
            <div
              className="left-0 text-left [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]"
              dangerouslySetInnerHTML={{
                __html: text.replace(/\n/g, '<br />'),
              }}
            />
          </div>

          <InputField
            label='이름'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            text={formData.name}
            showCheckIcon={false}
            className=''
            onChange={(e) => handleInputChange('name', e.target.value)}
          />

          <InputField
            label='나이'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            text={formData.age.toString()}
            showCheckIcon={false}
            className=''
            onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
          />

          <PrimaryButton
            theme='white'
            size='large'
            onClick={() => document.getElementById('photoInput')?.click()}
            disabled={false}
            icon={null}
            hug={false}
            label='프로필 사진'
            showLabelStar={true}
          >
            이미지 추가
          </PrimaryButton>
          {formData.profileImageUrl && (
            <span className='text-sm text-gray-600'>
              {formData.profileImageUrl.name}
            </span>
          )}
          <input
            type='file'
            id='photoInput'
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />

          <Select
            label='성별'
            className=''
            options={['남성', '여성']}
            title='성별을 선택하세요'
            showLabel={true}
            starshow={true}
            onOptionSelect={(option) =>
              handleInputChange('gender', option as string)
            }
            infoText=''
            showIcon={true}
          />

          <InputField
            label='종류'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            text={formData.species}
            showCheckIcon={false}
            className=''
            onChange={(e) => handleInputChange('species', e.target.value)}
          />

          <Select
            label='관계'
            className=''
            options={dynamicRelationshipOptions}
            title='나와의 관계를 선택하세요'
            showLabel={true}
            starshow={true}
            onOptionSelect={(option) =>
              handleInputChange('relationship', option as string)
            }
            infoText=''
            showIcon={true}
          />

          <InputField
            label='소개'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            text={formData.introduction}
            showCheckIcon={false}
            className=''
            onChange={(e) => handleInputChange('introduction', e.target.value)}
          />

          <DateInputField
            label='떠난 날'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            date={
              formData.memorialDate ? new Date(formData.memorialDate) : null
            }
            placeholder='떠난 날을 선택하세요'
            onChange={(date) => handleInputChange('memorialDate', date)}
          />

          <div className='flex justify-end w-full mt-5'>
            {showPrimaryButton && (
              <PrimaryButton
                theme='white'
                size='small'
                onClick={handleButtonClick}
                disabled={!isFormValid}
                icon={<ArrowIcon color='black' direction='right' size={24} />}
                hug={true}
              ></PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
