import React from 'react';
import { ReactComponent as LetterIcon } from 'assets/symbols/letter.svg';

interface LetterIconsProps {
  variant: 'letter' | 'letter-text';
  text?: string;
}

export const LetterIcons: React.FC<LetterIconsProps> = ({ variant, text }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
      {variant === 'letter-text' ? (
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
          {text || '편지쓰기'}
        </div>
      ) : (
        <LetterIcon className="w-6 h-6" />
      )}
    </div>
  );
};

export type { LetterIconsProps };
