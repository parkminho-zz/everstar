import { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from 'components/molecules/cards/ProfileCard/ProfileCard';

const meta: Meta<typeof ProfileCard> = {
  title: 'Molecules/Card/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '이름',
      defaultValue: '홍길동',
    },
    age: {
      control: 'number',
      description: '나이',
      defaultValue: 5,
    },
    date: {
      control: 'text',
      description: '날짜',
      defaultValue: '2023-07-25',
    },
    description: {
      control: 'text',
      description: '설명',
      defaultValue: '사랑스러운 반려동물입니다.',
    },
    tagList: {
      control: { type: 'select', options: ['쾌활한', '귀여운', '애교많은'] },
      description: '태그 목록',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '홍길동',
    age: 5,
    date: '2023-07-25',
    description: '사랑스러운 반려동물입니다.',
    tagList: ['쾌활한', '귀여운', '애교많은'],
  },
};

export const WithManyTags: Story = {
  args: {
    name: '김철수',
    age: 3,
    date: '2023-08-10',
    description: '매우 활발한 반려동물입니다.',
    tagList: ['활발한', '똑똑한', '장난꾸러기', '사랑스러운', '충성스러운'],
  },
};
