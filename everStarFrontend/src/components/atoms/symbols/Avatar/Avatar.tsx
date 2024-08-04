import React from 'react';
import defaultAvatarSrc from 'assets/symbols/avatar.png'; // 기본 이미지 import

interface AvatarProps {
  size: 'small' | 'medium' | 'large' | 'text' | 'square';
  src?: string; // 선택적 prop 추가
  name?: string;
  className?: string; // 추가된 부분
}

const sizeMap = {
  small: '24px',
  medium: '120px',
  large: '180px',
};

export const Avatar: React.FC<AvatarProps> = ({ size, src, name, className }) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      className={className}
    >
      {size === 'text' ? (
        <div
          style={{
            position: 'relative',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Noto_Sans-Bold',Helvetica",
            fontWeight: 'bold',
            fontSize: '8px',
            color: 'black',
            lineHeight: '8px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          마이페이지
        </div>
      ) : size === 'square' ? (
        <div className="w-[340px] h-[250px] self-stretch">
          <img src={src || defaultAvatarSrc} alt="avatar" />
        </div>
      ) : (
        <div
          style={{
            width: sizeMap[size],
            height: sizeMap[size],
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img
            src={src || defaultAvatarSrc}
            alt="avatar"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      {size === 'medium' && name && (
        <div
          style={{
            fontFamily: 'var(--kor-subtitle-subtitle1-font-family)',
            marginTop: '8px',
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export type { AvatarProps };
