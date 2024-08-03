import { Meta, StoryObj } from '@storybook/react';
import { ProfileSelection, ProfileSelectionProps } from './ProfileSelection';
import { action } from '@storybook/addon-actions'; // action 헬퍼 임포트

const meta: Meta<ProfileSelectionProps> = {
  title: 'Organics/ProfileSelection',
  component: ProfileSelection,
  tags: ['autodocs'],
  args: {
    avatars: [
      { src: '', size: 'medium' },
      { src: '', size: 'medium' },
      { src: '', size: 'medium' },
    ],
    onAddAvatar: () => alert('Add Avatar button clicked!'),
    onAvatarClick: action('onAvatarClick'), // action 헬퍼 사용
  },
};

export default meta;

type Story = StoryObj<ProfileSelectionProps>;

export const Default: Story = {};
