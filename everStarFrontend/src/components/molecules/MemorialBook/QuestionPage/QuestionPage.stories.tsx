import type { Meta, StoryObj } from '@storybook/react';
import { QuestionPage } from './QuestionPage';

const meta: Meta<typeof QuestionPage> = {
  title: 'Molecules/MemorialBook/QuestionPage',
  component: QuestionPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuestionPage>;

export const Default: Story = {
  args: {
    title: 'Q. 질문 제목',
    description: '이것은 질문에 대한 설명입니다.',
  },
};
