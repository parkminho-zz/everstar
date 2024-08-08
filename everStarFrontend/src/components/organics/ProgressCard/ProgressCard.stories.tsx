import type { Meta, StoryObj } from '@storybook/react';
import { ProgressCard } from './ProgressCard';

const meta: Meta<typeof ProgressCard> = {
  title: 'Organics/ProgressCard',
  component: ProgressCard,
  tags: ['autodocs'],
  argTypes: {
    fill: {
      control: { type: 'number', min: 0, max: 49, step: 1 },
      description: '진행 상황을 나타내는 값 (0-49)',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '0',
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
    title: {
      control: { type: 'text' },
      description: '카드의 제목',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    buttonTheme: {
      control: { type: 'radio' },
      options: ['focus', 'hover', 'white'],
      description: '버튼의 테마',
      table: {
        type: {
          summary: 'ViewMemorialBookTheme',
        },
        defaultValue: {
          summary: 'white',
        },
      },
    },
    buttonSize: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small'],
      description: '버튼의 크기',
      table: {
        type: {
          summary: 'ViewMemorialBookSize',
        },
        defaultValue: {
          summary: 'large',
        },
      },
    },
    buttonDisabled: {
      control: { type: 'boolean' },
      description: '버튼 활성화/비활성화 여부',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    buttonText: {
      control: { type: 'text' },
      description: '버튼의 텍스트',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
    buttonIcon: {
      control: { type: 'radio' },
      options: ['SmallStarImg', 'SmallEarthImg'],
      description: '버튼의 아이콘',
      table: {
        type: {
          summary: 'ButtonIcon',
        },
        defaultValue: {
          summary: 'SmallStarImg',
        },
      },
    },
    onButtonClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트 핸들러',
      table: {
        type: {
          summary: '() => void',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'ProgressCard 컴포넌트는 진행 상황을 시각적으로 표시하고 관련 메시지를 제공합니다. `fill` prop을 통해 진행 상황을 설정할 수 있습니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressCard>;

export const Default: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 0,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 ProgressCard 컴포넌트입니다. `fill` 값을 0으로 설정했습니다.',
      },
    },
  },
};

export const Fill6: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 6,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 6으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};

export const Fill13: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 13,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 13으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};

export const Fill20: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 20,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 20으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};

export const Fill27: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 27,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 27으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};

export const Fill34: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 34,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 34으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};

export const Fill41: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 41,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 41으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};

export const Fill48: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 48,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 48으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};

export const Fill49: Story = {
  args: {
    title: '무지개 퀘스트',
    fill: 49,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '퀘스트 진행',
    buttonIcon: 'SmallEarthImg',
    className: '',
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 49으로 설정한 ProgressCard 컴포넌트입니다.',
      },
    },
  },
};
