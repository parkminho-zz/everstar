import type { Meta, StoryObj } from '@storybook/react';
import { MyInfo } from 'components/templates/MyInfo';

const meta: Meta<typeof MyInfo> = {
  title: 'Templates/MyInfo',
  component: MyInfo,
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
      },
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MyInfo>;

export const Default: Story = {
  args: {},
};
