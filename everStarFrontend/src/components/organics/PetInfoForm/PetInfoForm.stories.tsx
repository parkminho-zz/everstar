import { Meta, StoryObj } from '@storybook/react';
import { PetInfoForm, PetInfoFormProps } from './PetInfoForm';

const meta: Meta<PetInfoFormProps> = {
  title: 'Organics/PetInfoForm',
  component: PetInfoForm,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<PetInfoFormProps>;

export const Default: Story = {
  args: {
    headerText: '반려동물 정보 입력',
    smallButtonText: '', // 버튼 텍스트 추가
    showPrimaryButton: true,
    text: '반려동물의 정보를<br/>입력해주세요.', // 텍스트 추가
  },
};
