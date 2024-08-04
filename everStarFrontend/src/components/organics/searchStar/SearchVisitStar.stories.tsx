import { Meta, StoryObj } from '@storybook/react';
import { SearchVisitStar, SearchVisitStarProps } from './SearchVisitStar';

const meta: Meta<SearchVisitStarProps> = {
  title: 'Organics/SearchStar/SearchVisitStar',
  tags: ['autodocs'],
  component: SearchVisitStar,
  argTypes: {
    isOpen: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
    onResend: { action: 'resend code' },
    onVerify: { action: 'verify code' },
    text: { control: 'text', defaultValue: '' },
    height: { control: 'text', defaultValue: '800px' },
  },
};

export default meta;

type Story = StoryObj<SearchVisitStarProps>;

export const Default: Story = {
  args: {
    isOpen: true,
    text: '',
    height: '800px',
  },
};
