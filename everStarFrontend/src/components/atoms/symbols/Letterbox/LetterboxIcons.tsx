import React from 'react';
import { ReactComponent as LetterboxIcon } from 'assets/symbols/letterbox.svg';

interface LetterboxIconsProps {
  variant: 'letterbox' | 'letterbox-alert' | 'letterbox-text';
  number?: number;
}

export const LetterboxIcons: React.FC<LetterboxIconsProps> = ({ variant, number }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
      {variant === 'letterbox-text' ? (
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
          편지
        </div>
      ) : (
        <>
          <LetterboxIcon className="w-6 h-6" />
          {variant === 'letterbox-alert' && number !== undefined && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <circle cx="10.5" cy="6.5" r="5.5" fill="#FF9078" />
              <text
                x="10.5"
                y="7.5"
                textAnchor="middle"
                fill="#1F2329"
                fontSize="5"
                fontFamily="Arial"
                dy=".3em"
              >
                {number}
              </text>
            </svg>
          )}
        </>
      )}
    </div>
  );
};

export type { LetterboxIconsProps };
