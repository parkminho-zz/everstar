import type { Meta, StoryObj } from '@storybook/react';
import { QuestionPage } from './QuestionPage';

const meta: Meta<typeof QuestionPage> = {
  title: 'Molecules/MemorialBook/QuestionPage',
  component: QuestionPage,
  tags: ['autodocs'],
};

export default meta; // 기본 내보내기 추가

type Story = StoryObj<typeof QuestionPage>;

export const Default: Story = {
  args: {
    title: '반려동물 어쩌고 저쩌고 질문입니다. 어떻게 질문을 써야할지는 잘 모르겠습니다.',
    petName: '강아지',
  },
};
