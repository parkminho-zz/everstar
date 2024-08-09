import type { Meta, StoryObj } from '@storybook/react';
import { SplashTemplate } from './SplashTemplate';

const meta: Meta<typeof SplashTemplate> = {
  title: 'Templates/SplashTemplate',
  component: SplashTemplate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'SplashTemplate 컴포넌트는 로켓 또는 책과 관련된 스플래시 화면을 렌더링합니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['rocket', 'book'],
      },
      description: '스플래시 화면의 타입을 선택합니다.',
      defaultValue: 'rocket',
    },
    className: {
      control: 'text',
      description: '추가적인 CSS 클래스 이름',
      defaultValue: '',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SplashTemplate>;

export const RocketSplash: Story = {
  args: {
    type: 'rocket',
  },
};

export const BookSplash: Story = {
  args: {
    type: 'book',
  },
};
