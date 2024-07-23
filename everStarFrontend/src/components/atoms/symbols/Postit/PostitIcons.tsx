import React from 'react';

interface PostitIconsProps {
  variant: 'postit' | 'postit-text';
  text?: string;
}

const PostitIcons: React.FC<PostitIconsProps> = ({ variant, text }) => {
  const iconSrc = require('../../../../assets/symbols/postit.png');

  return (
    <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
      {variant === 'postit-text' ? (
        <div style={{
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
          whiteSpace: 'nowrap'
        }}>
          {text || '텍스트'}
        </div>
      ) : (
        <img src={iconSrc} alt={variant} style={{ width: '24px', height: '24px' }} />
      )}
    </div>
  );
};

export default PostitIcons;
export type { PostitIconsProps };
