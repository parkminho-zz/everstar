#!/bin/bash

# Create the directory structure
mkdir -p src/components/molecules/MemorialBook/Question

# Create the Question component
cat <<EOF > src/components/molecules/MemorialBook/Question/Question.tsx
import React from 'react';
import PropTypes from 'prop-types';

interface QuestionProps {
  property1: 'title';
  property2: 'default';
}

export const Question: React.FC<QuestionProps> = ({ property1, property2 }) => {
  return (
    <div className="inline-flex items-start justify-center gap-5 relative">
      <div className="flex flex-col w-[294px] items-start gap-4 relative">
        <div className="relative self-stretch h-[33px] mt-[-1.00px] font-kor-h-h2 text-greyscaleblack-100 text-center">
          소중했던 추억회상
        </div>
        <p className="relative self-stretch font-kor-subtitle-subtitle1 text-greyscaleblack-100 text-center">
          Q.&nbsp;&nbsp;친구와 함께하며 가장 행복했던 순간이 언제였나요?
        </p>
      </div>
    </div>
  );
};

Question.propTypes = {
  property1: PropTypes.oneOf(['title']).isRequired,
  property2: PropTypes.oneOf(['default']).isRequired,
};

export type { QuestionProps };
EOF

# Create the index file for easy import
cat <<EOF > src/components/molecules/MemorialBook/Question/index.ts
export { Question } from './Question';
export type { QuestionProps } from './Question';
EOF

# Create the Storybook file
cat <<EOF > src/components/molecules/MemorialBook/Question/Question.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Question, QuestionProps } from './Question';

const meta: Meta<typeof Question> = {
  title: 'Molecules/MemorialBook/Question',
  component: Question,
  args: {
    property1: 'title',
    property2: 'default',
  },
  argTypes: {
    property1: {
      control: {
        type: 'select',
        options: ['title'],
      },
    },
    property2: {
      control: {
        type: 'select',
        options: ['default'],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Question component for MemorialBook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Question>;

export const Default: Story = {
  args: {
    property1: 'title',
    property2: 'default',
  },
};
EOF

echo "Question component and Storybook files have been created successfully."
