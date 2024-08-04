import { Meta, StoryObj } from '@storybook/react';
import { ProfileSelection, ProfileSelectionProps } from './ProfileSelection';
import { action } from '@storybook/addon-actions'; // action 헬퍼 임포트

const meta: Meta<ProfileSelectionProps> = {
  title: 'Organics/ProfileSelection',
  component: ProfileSelection,
  tags: ['autodocs'],
  args: {
    avatars: [
      {
        src: '',
        size: 'medium',
        name: '피카츄',
      },
      {
        src: '',
        size: 'medium',
        name: '라이츄',
      },
      {
        src: '',
        size: 'medium',
        name: '파이리',
      },
    ],
    onAddAvatar: () => alert('Add Avatar button clicked!'),
    onAvatarClick: action('onAvatarClick'), // action 헬퍼 사용
  },
};

export default meta;

type Story = StoryObj<ProfileSelectionProps>;

export const Default: Story = {
  args: {
    ...meta.args,
  },
};
