import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CheerMessage from './CheerMessage';

export default {
  title: 'Organics/CheerMessage',
  component: CheerMessage,
} as Meta;

const Template: StoryFn = (args) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <CheerMessage
      profile={{
        name: '1',
        age: 10,
        date: '',
        description: '',
        tagList: [],
        avatarUrl: '',
      }}
      postItCards={[]}
      totalPages={0}
      {...args}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  profile: {
    name: '홍길동',
    age: 5,
    date: '2023-07-25',
    description: '사랑스러운 반려동물입니다.',
    tagList: ['쾌활한', '귀여운', '애교많은'],
    avatarUrl: 'https://example.com/avatar.jpg',
  },
  postItCards: [
    { contents: '할 수 있어!', name: 'Alice', color: 'pink' },
    { contents: '계속 진행해!', name: 'Bob', color: 'green' },
    { contents: '훌륭해!', name: 'Charlie', color: 'blue' },
  ],
  totalPages: 1,
};
