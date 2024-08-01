import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm, SignUpFormProps } from 'components/organics/SignUpForm/SignUpForm';

const meta: Meta<SignUpFormProps> = {
  title: 'Organics/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SignUpFormProps>;

export const Default: Story = {
  args: {
    headerText: '회원가입',
    largeButtonText: '회원가입',
    smallButtonText: '',
    showPrimaryButton: true,
  },
};
