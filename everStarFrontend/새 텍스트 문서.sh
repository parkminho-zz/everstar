#!/bin/bash

# Define the icon name and component name
ICON_NAME="chat"
COMPONENT_NAME="Chat"

# Create SVG file
SVG_FILE="src/assets/icons/${ICON_NAME}.svg"
cat <<EOT > $SVG_FILE
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M24 3V15C24 15.7956 23.6839 16.5587 23.1213 17.1213C22.5587 17.6839 21.7956 18 21 18H13.5L6 24V18H3C2.20435 18 1.44129 17.6839 0.87868 17.1213C0.316071 16.5587 0 15.7956 0 15V3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H21C21.7956 0 22.5587 0.316071 23.1213 0.87868C23.6839 1.44129 24 2.20435 24 3ZM7.5 7.5H4.5V10.5H7.5V7.5ZM10.5 7.5H13.5V10.5H10.5V7.5ZM19.5 7.5H16.5V10.5H19.5V7.5Z" fill="#3F3F46"/>
</svg>
EOT

# Create component directory
COMPONENT_DIR="src/components/atoms/icons/${COMPONENT_NAME}/"
mkdir -p $COMPONENT_DIR

# Create component file
COMPONENT_FILE="${COMPONENT_DIR}/${COMPONENT_NAME}Icon.tsx"
cat <<EOT > $COMPONENT_FILE
import React from 'react';
import { ReactComponent as ${COMPONENT_NAME}IconSVG } from '../../../../assets/icons/${ICON_NAME}.svg';

interface ${COMPONENT_NAME}IconProps {
  size: 16 | 24;
  color?: 'black' | 'gray' | 'white' | 'orange';
}

const ${COMPONENT_NAME}Icon: React.FC<${COMPONENT_NAME}IconProps> = ({ size, color = 'black' }) => {
  const sizeClasses = size === 16 ? 'w-4 h-4' : 'w-6 h-6';
  const colorClasses = {
    black: 'text-greyscaleblack-100',
    gray: 'text-greyscaleblack-60',
    white: 'text-greyscalewhite',
    orange: 'text-mainprimary',
  };

  return <${COMPONENT_NAME}IconSVG className={\`\${sizeClasses} \${colorClasses[color]}\`} />;
};

export default ${COMPONENT_NAME}Icon;
export type { ${COMPONENT_NAME}IconProps };
EOT

# Create Storybook file
STORY_FILE="${COMPONENT_DIR}/${COMPONENT_NAME}Icon.stories.tsx"
cat <<EOT > $STORY_FILE
import type { Meta, StoryObj } from '@storybook/react';
import ${COMPONENT_NAME}Icon from './${COMPONENT_NAME}Icon';

const meta: Meta<typeof ${COMPONENT_NAME}Icon> = {
  title: 'Atoms/Icons/${COMPONENT_NAME}Icon',
  component: ${COMPONENT_NAME}Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: [16, 24] },
    },
    color: {
      control: { type: 'radio', options: ['black', 'gray', 'white', 'orange'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ${COMPONENT_NAME}Icon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};
EOT

echo "Chat icon created successfully."
