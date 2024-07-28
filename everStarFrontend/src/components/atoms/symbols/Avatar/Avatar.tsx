import React from 'react';

interface AvatarProps {
  size: 'small' | 'medium' | 'large' | 'text';
  name?: string;
  className?: string; // 추가된 부분
}

const sizeMap = {
  small: '24px',
  medium: '120px',
  large: '180px',
};

export const Avatar: React.FC<AvatarProps> = ({ size, name, className }) => {
  const avatarSrc = require('assets/symbols/avatar.png');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={className}>
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
      ) : (
        <div
          style={{
            width: sizeMap[size],
            height: sizeMap[size],
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img src={avatarSrc} alt="avatar" style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      {size === 'medium' && name && (
        <div style={{ fontFamily: 'var(--kor-subtitle-subtitle1-font-family)', marginTop: '8px' }}>
          {name}
        </div>
      )}
    </div>
  );
};

export type { AvatarProps };
