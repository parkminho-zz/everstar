import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ViewMemorialBook, ViewMemorialBookProps } from './ViewMemorialBook';

export default {
  title: 'Organics/Buttons/ViewMemorialBook',
  component: ViewMemorialBook,
  argTypes: {
    theme: {
      control: { type: 'select', options: ['focus', 'hover', 'white'] },
    },
    disabled: { control: 'boolean' },
    BookVariant: {
      control: { type: 'select', options: ['book-close', 'book-open'] }, // BookVariant에 대한 제어 추가
    },
    showIcon: { control: 'boolean' },
    toggleStatus: {
      control: { type: 'select', options: ['on', 'off'] },
    },
    onToggleChange: { action: 'toggle changed' }, // 토글 상태 변경에 대한 액션 추가
    isActive: { control: 'boolean' }, // MemorialBook 활성화 여부에 대한 제어 추가
  },
} as Meta<typeof ViewMemorialBook>;

type Story = StoryObj<ViewMemorialBookProps>;

export const Focus: Story = {
  args: {
    theme: 'focus',
    size: 'large', // 크기는 'large'로 고정
    disabled: false,
    BookVariant: 'book-close', // 기본 BookVariant
    showIcon: true,
    isActive: true, // 활성화 상태
  },
};

export const Hover: Story = {
  args: {
    theme: 'hover',
    size: 'large', // 크기는 'large'로 고정
    disabled: false,
    BookVariant: 'book-open', // 'book-open' 예시
    showIcon: true,
    isActive: true, // 활성화 상태
  },
};

export const White: Story = {
  args: {
    theme: 'white',
    size: 'large', // 크기는 'large'로 고정
    disabled: false,
    BookVariant: 'book-close',
    showIcon: true,
    isActive: true, // 활성화 상태
  },
};

export const Disabled: Story = {
  args: {
    theme: 'focus',
    size: 'large', // 크기는 'large'로 고정
    disabled: true,
    BookVariant: 'book-close',
    showIcon: true,
    isActive: false, // 비활성화 상태
  },
};

export const WithMessageAndIcon: Story = {
  args: {
    theme: 'focus',
    size: 'large', // 크기는 'large'로 고정
    disabled: false,
    BookVariant: 'book-open', // 'book-open' 예시
    showIcon: true,
    isActive: true, // 활성화 상태
  },
};

export const WithoutIcon: Story = {
  args: {
    theme: 'focus',
    size: 'large', // 크기는 'large'로 고정
    disabled: false,
    BookVariant: 'book-close',
    showIcon: false,
    isActive: true, // 활성화 상태
  },
};

export const WithToggle: Story = {
  render: (args) => {
    const [toggleStatus, setToggleStatus] = useState<'on' | 'off'>(args.toggleStatus || 'off');

    const handleToggleChange = (status: 'on' | 'off') => {
      setToggleStatus(status);
      alert(`Toggle status changed to ${status === 'on' ? 'On' : 'Off'}`);
      args.onToggleChange?.(status); // 상태 변경을 기록하기 위해 액션 호출
    };

    return (
      <ViewMemorialBook {...args} toggleStatus={toggleStatus} onToggleChange={handleToggleChange} />
    );
  },
  args: {
    theme: 'focus',
    size: 'large', // 크기는 'large'로 고정
    disabled: false,
    BookVariant: 'book-open', // 'book-open' 예시
    showIcon: true,
    toggleStatus: 'off', // 초기 상태
    isActive: true, // 활성화 상태
  },
};
