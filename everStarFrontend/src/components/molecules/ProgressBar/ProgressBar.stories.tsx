import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    fill: {
      control: {
        type: 'number',
        min: 0,
        max: 49,
        step: 1,
      },
      description: '진행 상황을 나타내는 값 (0-49)',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '0', // 수정: number를 string으로 변경
        },
      },
    },
    className: {
      control: { type: 'text' },
      description: '추가적인 CSS 클래스',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'ProgressBar 컴포넌트는 진행 상황을 시각적으로 표시합니다. `fill` prop을 통해 진행 상황을 설정할 수 있습니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    fill: 0,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 ProgressBar 컴포넌트입니다. `fill` 값을 0으로 설정했습니다.',
      },
    },
  },
};

export const Fill6: Story = {
  args: {
    fill: 6,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 6으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};

export const Fill13: Story = {
  args: {
    fill: 13,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 13으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};

export const Fill20: Story = {
  args: {
    fill: 20,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 20으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};

export const Fill27: Story = {
  args: {
    fill: 27,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 27으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};

export const Fill34: Story = {
  args: {
    fill: 34,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 34으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};

export const Fill41: Story = {
  args: {
    fill: 41,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 41으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};

export const Fill48: Story = {
  args: {
    fill: 48,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 48으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};

export const Fill49: Story = {
  args: {
    fill: 49,
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 49으로 설정한 ProgressBar 컴포넌트입니다.',
      },
    },
  },
};