import React from 'react';
type LabelSize = 'large' | 'medium' | 'small';
type Color = 'black' | 'gray' | 'white';

interface ILetterText {
  size: LabelSize;
  color: Color;
  children?: string;
}

const fontStyle = {
  large: 'text-[16px] font-normal leading-normal tracking-tight',
  medium: 'text-[13px] font-normal leading-normal tracking-[-1.04px]',
  small: 'text-[12px] font-normal leading-normal tracking-[-0.24px]',
};

const colorStyle = {
  black: 'text-greyscaleblack-100',
  gray: 'text-greyscaleblack-80',
  white: 'text-greyscalewhite',
};

export const LetterText = ({ size, color, children }: ILetterText) => {
  return (
    <div className="max-w-full">
      <div className={`top-0 left-0 font-Kyobo ${fontStyle[size]} ${colorStyle[color]}`}>
        {children}
      </div>
    </div>
  );
};
