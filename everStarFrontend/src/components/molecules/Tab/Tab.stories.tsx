import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Molecules/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tab 컴포넌트는 다양한 탭 요소들을 포함한 컨테이너입니다.',
      },
    },
  },
  argTypes: {
    row: {
      control: {
        type: 'select',
        options: ['two', 'three'],
      },
      description: '탭의 개수',
      defaultValue: 'two',
    },
    activeTab: {
      control: {
        type: 'select',
        options: ['one', 'two', 'three'],
      },
      description: '활성화된 탭',
      defaultValue: 'one',
    },
    className: {
      control: 'text',
      description: '추가적인 클래스 네임',
      defaultValue: '',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const TwoTabs: Story = {
  args: {
    row: 'two',
    activeTab: 'one',
    className: '',
  },
};

export const ThreeTabs: Story = {
  args: {
    row: 'three',
    activeTab: 'one',
    className: '',
  },
};
