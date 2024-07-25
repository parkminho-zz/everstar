import React from 'react';

interface IInformationText {
  children: string;
  state: 'error' | 'default';
  className?: string;
  divClassName?: string;
}

export const InformationText = ({
  children = '2019-10-08 09:38:07',
  state,
  className = '',
  divClassName = '',
}: IInformationText): JSX.Element => {
  return (
    <div className={`relative justify-center w-[116px] h-[17px] inline-flex gap-2 ${className}`}>
      <div
        className={`kor-p-p4 font-normal ${
          state === 'error' ? 'w-fit text-mainerror' : 'text-greyscaleblack-80'
        } ${divClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
