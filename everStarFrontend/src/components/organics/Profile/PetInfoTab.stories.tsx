// src/components/organics/Profile/PetInfoTab.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { PetInfoTab, PetInfoTabProps } from './PetInfoTab';
import { action } from '@storybook/addon-actions';

const meta: Meta<PetInfoTabProps> = {
  title: 'Organics/PetInfoTab',
  component: PetInfoTab,
  tags: ['autodocs'],
  args: {
    petOptions: ['피카츄', '라이츄', '파이리'],
    petInfo: {
      피카츄: {
        id: 1,
        userId: 1,
        name: '피카츄',
        age: 5,
        memorialDate: '2022-01-01',
        species: '포켓몬',
        gender: '남성',
        relationship: '친구',
        profileImageUrl: '',
        personalities: ['활발함', '친절함'],
      },
      라이츄: {
        id: 2,
        userId: 1,
        name: '라이츄',
        age: 6,
        memorialDate: '2022-01-02',
        species: '포켓몬',
        gender: '여성',
        relationship: '친구',
        profileImageUrl: '',
        personalities: ['용감함', '친절함'],
      },
    },
    onPetSelect: action('onPetSelect'),
  },
};

export default meta;

type Story = StoryObj<PetInfoTabProps>;

export const Default: Story = {
  args: {
    ...meta.args,
  },
};
