import { Meta, StoryObj } from '@storybook/react';
import { Select, SelectProps } from './Select';

const meta: Meta<SelectProps> = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '추가 클래스 이름',
      defaultValue: '',
    },
    options: {
      control: 'object',
      description: '드롭다운 옵션 목록',
      defaultValue: ['Option 1', 'Option 2', 'Option 3'],
    },
    onOptionSelect: { action: 'option selected' },
    title: {
      control: 'text',
      description: '드롭다운 기본 타이틀',
      defaultValue: 'Select an option',
    },
    showLabel: {
      control: 'boolean',
      description: '레이블 표시 여부',
      defaultValue: true,
    },
    starshow: {
      control: 'boolean',
      description: '레이블 옆 별표 표시 여부',
      defaultValue: true,
    },
    infoText: {
      control: 'text',
      description: '정보 텍스트',
      defaultValue: '',
    },
    showIcon: {
      control: 'boolean',
      description: '아이콘 표시 여부',
      defaultValue: true,
    },
  },
};

export default meta;

type Story = StoryObj<SelectProps>;

export const GenderSelect: Story = {
  args: {
    className: 'custom-class',
    options: ['Male', 'Female'],
    title: 'Select Gender',
    showLabel: true,
    starshow: true,
    infoText: 'Please select your gender',
    showIcon: true,
  },
};

export const YearSelect: Story = {
  args: {
    className: 'custom-class',
    options: Array.from({ length: 100 }, (_, i) => 2024 - i),
    title: 'Select Year',
    showLabel: true,
    starshow: true,
    infoText: 'Please select your birth year',
    showIcon: true,
  },
};

export const NoIconSelect: Story = {
  args: {
    className: 'custom-class',
    options: ['Option 1', 'Option 2', 'Option 3'],
    title: 'Select an option',
    showLabel: true,
    starshow: true,
    infoText: 'Select an option from the dropdown',
    showIcon: false,
  },
};
