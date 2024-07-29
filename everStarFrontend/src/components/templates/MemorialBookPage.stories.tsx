import type { Meta, StoryObj } from '@storybook/react';
import { MemorialBookPage } from 'components/templates/MemorialBookPage';

const meta: Meta<typeof MemorialBookPage> = {
  title: 'Templates/MemorialBookPage',
  component: MemorialBookPage,
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

type Story = StoryObj<typeof MemorialBookPage>;

export const Default: Story = {
  args: {},
};
