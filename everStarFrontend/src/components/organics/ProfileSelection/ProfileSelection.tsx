import React from 'react';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { CircleButton } from 'components/atoms/buttons/CircleButton';

export interface AvatarData {
  src?: string;
  size: 'small' | 'medium' | 'large';
  name?: string;
}

export interface ProfileSelectionProps {
  avatars: AvatarData[];
  onAddAvatar: () => void;
  onAvatarClick?: (index: number) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  avatars,
  onAddAvatar,
  onAvatarClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white w-full max-w-[832px] mx-auto">
      <h1 className="mb-4 text-2xl font-semibold text-greyscaleblack-100">
        여행을 함께 할 친구를 선택해주세요
      </h1>
      <div className="flex flex-wrap justify-center w-full gap-8">
        {avatars.map((avatar, index) => (
          <div key={index} className="flex flex-col items-center">
            <Avatar
              src={avatar.src}
              size={avatar.size}
              name={avatar.name}
              onClick={() => onAvatarClick && onAvatarClick(index)}
            />
          </div>
        ))}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          <CircleButton theme="white" icon="plus" disabled={false} onClick={onAddAvatar} />
        </div>
      </div>
    </div>
  );
};
