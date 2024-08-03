import { Meta, StoryObj } from '@storybook/react';
import { ProfileSelection, ProfileSelectionProps } from './ProfileSelection';

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
  },
};

export default meta;

type Story = StoryObj<ProfileSelectionProps>;

export const Default: Story = {};
