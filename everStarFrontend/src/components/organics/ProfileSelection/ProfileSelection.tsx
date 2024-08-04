import React from 'react';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { CircleButton } from 'components/atoms/buttons/CircleButton';

export interface AvatarData {
  src?: string;
  size: 'small' | 'medium' | 'large';
  name?: string; // 이름을 추가하여 아바타마다 이름을 지정할 수 있게 함
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
    <div className='flex flex-col items-center justify-center gap-8 p-8 relative bg-white w-full max-w-[832px] mx-auto'>
      <div className='inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]'>
        <p className='relative w-fit mt-[-1.00px] font-kor-h-h1 font-[number:var(--kor-h-h1-font-weight)] text-greyscaleblack-100 text-[length:var(--kor-h-h1-font-size)] tracking-[var(--kor-h-h1-letter-spacing)] leading-[var(--kor-h-h1-line-height)] [font-style:var(--kor-h-h1-font-style)]'>
          여행을 함께 할 친구를 선택해주세요
        </p>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-8 relative self-stretch w-full'>
        {avatars.map((avatar, index) => (
          <div key={index} className='flex flex-col items-center'>
            <Avatar
              src={avatar.src}
              size={avatar.size}
              name={avatar.name} // 이름 속성 추가
              onClick={() => onAvatarClick && onAvatarClick(index)}
            />
          </div>
        ))}
        <div className='relative w-[120px] h-[120px]'>
          <div className='flex flex-col w-[120px] h-[156px] items-center justify-center gap-1 pt-0 pb-[26px] px-0 relative'>
            <CircleButton
              theme='white'
              icon='plus'
              disabled={false}
              onClick={onAddAvatar}
            />
            <div className='relative self-stretch w-full h-8 mb-[-13.00px]' />
          </div>
        </div>
      </div>
    </div>
  );
};
