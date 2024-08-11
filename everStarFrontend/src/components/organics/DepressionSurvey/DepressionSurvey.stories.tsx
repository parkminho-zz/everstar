import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DepressionSurvey } from './DepressionSurvey';

// 메타 데이터를 설정합니다.
const meta: Meta<typeof DepressionSurvey> = {
  title: 'Components/DepressionSurvey',
  component: DepressionSurvey,
  tags: ['autodocs'],
};

// 디폴트 내보내기를 사용하여 메타 데이터를 설정합니다.
export default meta;

type Story = StoryObj<typeof DepressionSurvey>;

// 기본 상태의 스토리를 설정합니다.
export const Default: Story = {
  render: () => (
    <DepressionSurvey
      onSubmitSuccess={() => {
        console.log('설문 제출 성공');
      }}
    />
  ),
};
