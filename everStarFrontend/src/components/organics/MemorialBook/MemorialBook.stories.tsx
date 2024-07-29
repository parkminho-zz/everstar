import type { Meta, StoryObj } from '@storybook/react';
import { MemorialBook, PageType } from './MemorialBook';

const meta: Meta<typeof MemorialBook> = {
  title: 'Organics/MemorialBook',
  component: MemorialBook,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    minWidth: { control: 'number' },
    maxWidth: { control: 'number' },
    minHeight: { control: 'number' },
    maxHeight: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof MemorialBook>;

const pages: PageType[] = [
  { type: 'cover' },
  { type: 'question', question: 'Q. What is your favorite memory?', petName: 'Buddy' },
  {
    type: 'imageQuestion',
    question: 'Q. Share a drawing',
    myImage: 'https://via.placeholder.com/360x270',
    myAnswer: 'This is my drawing.',
    petImage: 'https://via.placeholder.com/360x270',
    petAnswer: "This is Buddy's drawing.",
  },
  {
    type: 'chart',
    title: 'Evaluation Result',
    content: 'It has improved significantly.',
    scores: [10, 30, 50, 70, 90, 60, 40],
  },
];

export const Default: Story = {
  args: {
    pages,
  },
};
