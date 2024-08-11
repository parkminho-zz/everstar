import React, { useEffect, useState } from 'react';
import { BookIcons } from 'components/atoms/symbols/Book/BookIcons';
import { Toggle } from 'components/atoms/buttons/Toggle';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Lable } from 'components/atoms/texts/Lable';

type ViewMemorialBookTheme = 'focus' | 'hover' | 'white';

export interface ViewMemorialBookProps {
  theme: ViewMemorialBookTheme;
  size?: 'large'; // Fixed size to 'large', made optional with a default value
  disabled: boolean;
  BookVariant: 'book-close' | 'book-open'; // Updated the type to match BookIconsProps
  onClick: () => void; // Simplified onClick handler type
  showIcon?: boolean; // Optional flag to show/hide the BookIcons
  toggleStatus?: 'on' | 'off'; // Optional toggle status
  onToggleChange?: (status: 'on' | 'off') => void; // Optional toggle change handler
  showToggle?: boolean; // Show or hide the toggle button
  isActive?: boolean; // Indicates if the MemorialBook is active
  isOwner?: boolean; // Indicates if the current user is the owner of the MemorialBook
}

export const ViewMemorialBook: React.FC<ViewMemorialBookProps> = ({
  theme,
  size = 'large', // Default size is 'large'
  onClick,
  disabled,
  BookVariant = 'book-close', // Default value is now type-safe
  showIcon = true,
  toggleStatus,
  onToggleChange,
  showToggle = true, // Default to show the toggle button
  isActive = true, // Default to active
  isOwner = true, // Default to owner view
}) => {
  const [localToggleStatus, setLocalToggleStatus] = useState<'on' | 'off' | undefined>(
    toggleStatus,
  );
  const [buttonText, setButtonText] = useState<string>(''); // 문구를 저장할 상태

  const handleToggle = (status: 'on' | 'off') => {
    setLocalToggleStatus(status);
    if (onToggleChange) {
      onToggleChange(status);
    }
  };

  useEffect(() => {
    if (toggleStatus) {
      setLocalToggleStatus(toggleStatus);
    }

    // 문구 설정 로직
    if (!isActive) {
      setButtonText('메모리얼북이 아직 활성화되지 않았어요');
    } else if (isOwner) {
      // 내가 보는 경우
      if (toggleStatus === 'on') {
        setButtonText('메모리얼북을 모두가 볼 수 있어요');
      } else if (toggleStatus === 'off') {
        setButtonText('메모리얼북을 나만 볼 수 있어요');
      } else {
        setButtonText('메모리얼북이 아직 활성화 되지 않았어요');
      }
    } else {
      // 다른 사용자가 보는 경우
      if (toggleStatus === 'on') {
        setButtonText('메모리얼북을 볼 수 있어요');
      } else if (toggleStatus === 'off') {
        setButtonText('메모리얼북은 비공개 상태에요');
      } else {
        setButtonText('메모리얼북이 아직 활성화 되지 않았어요');
      }
    }
  }, [toggleStatus, disabled, isActive, isOwner]);

  return (
    <div className="flex flex-col items-center">
      {showIcon && (
        <div className="mb-6">
          <BookIcons variant={BookVariant} />
        </div>
      )}
      <PrimaryButton theme={theme} size={size} disabled={disabled} onClick={onClick}>
        {buttonText}
      </PrimaryButton>

      {showToggle && localToggleStatus && (
        <div className="relative z-10 flex flex-col items-center justify-center my-6">
          <Lable prop="메모리얼북 공개 상태" show={false} font="default" />
          <div className="mt-2">
            <Toggle status={localToggleStatus} onChange={handleToggle} />
          </div>
        </div>
      )}
    </div>
  );
};
