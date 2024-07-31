import { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Organics/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    showLabel: {
      control: 'boolean',
      description: '레이블 표시 여부',
      defaultValue: true,
    },
    showValidationText: {
      control: 'boolean',
      description: '유효성 검사 텍스트 표시 여부',
      defaultValue: true,
    },
    state: {
      control: { type: 'select', options: ['default', 'focus', 'disable', 'done', 'error'] },
      description: 'InputField 상태',
      defaultValue: 'default',
    },
    className: {
      control: 'text',
      description: '추가 클래스 이름',
      defaultValue: '',
    },
    text: {
      control: 'text',
      description: 'InputField의 텍스트',
      defaultValue: '비밀번호를 입력해 주세요',
    },
    showCheckIcon: {
      control: 'boolean',
      description: '체크 아이콘 표시 여부',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    showLabel: true,
    showValidationText: true,
    state: 'default',
    className: '',
    text: '비밀번호를 입력해 주세요',
    showCheckIcon: false,
  },
};

export const Focus: Story = {
  args: {
    showLabel: true,
    showValidationText: true,
    state: 'focus',
    className: '',
    text: '비밀번호를 입력해 주세요',
    showCheckIcon: false,
  },
};

export const Disabled: Story = {
  args: {
    showLabel: true,
    showValidationText: true,
    state: 'disable',
    className: '',
    text: '비밀번호를 입력해 주세요',
    showCheckIcon: false,
  },
};

export const Done: Story = {
  args: {
    showLabel: true,
    showValidationText: true,
    state: 'done',
    className: '',
    text: '비밀번호를 입력해 주세요',
    showCheckIcon: true,
  },
};

export const Error: Story = {
  args: {
    showLabel: true,
    showValidationText: true,
    state: 'error',
    className: '',
    text: '비밀번호를 입력해 주세요',
    showCheckIcon: false,
  },
};
