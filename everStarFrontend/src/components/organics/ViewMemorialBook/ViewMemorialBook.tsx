import React from 'react';
import { BookIcons } from 'components/atoms/symbols/Book/BookIcons';
import { Toggle } from 'components/atoms/buttons/Toggle';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Lable } from 'components/atoms/texts/Lable';
type ViewMemorialBookTheme = 'focus' | 'hover' | 'white';

export interface ViewMemorialBookProps {
  theme: ViewMemorialBookTheme;
  size?: 'large'; // Fixed size to 'large', made optional with a default value
  disabled: boolean;
  children: string;
  BookVariant: 'book-close' | 'book-open'; // Updated the type to match BookIconsProps
  onClick: () => void; // Simplified onClick handler type
  showIcon?: boolean; // Optional flag to show/hide the BookIcons
  toggleStatus?: 'on' | 'off'; // Optional toggle status
  onToggleChange?: (status: 'on' | 'off') => void; // Optional toggle change handler
}

export const ViewMemorialBook: React.FC<ViewMemorialBookProps> = ({
  theme,
  size = 'large', // Default size is 'large'
  children,
  onClick,
  disabled,
  BookVariant = 'book-close', // Default value is now type-safe
  showIcon = true,
  toggleStatus,
  onToggleChange,
}) => {
  const handleToggle = (status: 'on' | 'off') => {
    if (onToggleChange) {
      onToggleChange(status);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {showIcon && (
        <div className="mb-6">
          <BookIcons variant={BookVariant} />
        </div>
      )}
      <PrimaryButton theme={theme} size={size} disabled={disabled} onClick={onClick}>
        {children}
      </PrimaryButton>

      {toggleStatus && (
        <div className="relative z-10 flex flex-col items-center justify-center my-6">
          <Lable prop="메모리얼북 공개 상태" show={false} font="default" />
          <div className="mt-2">
            <Toggle status={toggleStatus} onChange={handleToggle} />
          </div>
        </div>
      )}
    </div>
  );
};
