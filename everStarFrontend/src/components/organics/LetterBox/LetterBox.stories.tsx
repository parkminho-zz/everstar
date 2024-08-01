import type { Meta, StoryObj } from '@storybook/react';
import { LetterBox } from './LetterBox'; // 정확한 경로로 변경해야 합니다.

const meta: Meta<typeof LetterBox> = {
  title: 'Organics/LetterBox', // 스토리북에 표시될 이름
  component: LetterBox,
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

type Story = StoryObj<typeof LetterBox>;

export const Default: Story = {
  args: {},
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
