import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingDescription } from './OnboardingDescription';

const meta: Meta<typeof OnboardingDescription> = {
  title: 'Organics/OnboardingDescription',
  component: OnboardingDescription,
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: { type: 'radio', options: ['page-1', 'page-2', 'page-3', 'page-4'] },
      description: '페이지 종류를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'page-1' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'OnboardingDescription 컴포넌트는 온보딩 과정에서 보여지는 설명 페이지입니다. `page` prop을 통해 페이지 종류를 설정할 수 있습니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof OnboardingDescription>;

export const Page1: Story = {
  args: {
    page: 'page-1',
  },
  parameters: {
    docs: {
      description: {
        story: '`page-1` 설정된 OnboardingDescription 컴포넌트입니다.',
      },
    },
  },
};

export const Page2: Story = {
  args: {
    page: 'page-2',
  },
  parameters: {
    docs: {
      description: {
        story: '`page-2` 설정된 OnboardingDescription 컴포넌트입니다.',
      },
    },
  },
};

export const Page3: Story = {
  args: {
    page: 'page-3',
  },
  parameters: {
    docs: {
      description: {
        story: '`page-3` 설정된 OnboardingDescription 컴포넌트입니다.',
      },
    },
  },
};

export const Page4: Story = {
  args: {
    page: 'page-4',
  },
  parameters: {
    docs: {
      description: {
        story: '`page-4` 설정된 OnboardingDescription 컴포넌트입니다.',
      },
    },
  },
};
