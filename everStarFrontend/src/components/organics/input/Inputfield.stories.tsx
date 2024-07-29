
import { fn } from "@storybook/test";
import {InputField} from './Inputfield';

export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

export default {
  component: InputField,
  title: 'Organics/Inputfield',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
};

export const Default = {
  args: {
    task: {
      id: '3',
      title: 'Inputfield',
      state: 'TASK_INBOX',
    },
  },
};

export const Pinned = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    },
  },
};

export const Archived = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    },
  },
};

