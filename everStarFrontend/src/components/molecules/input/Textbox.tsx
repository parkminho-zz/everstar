import PropTypes from 'prop-types';
import React from 'react';
import { Lable } from 'components/atoms/texts/Lable';
import { InformationText } from 'components/atoms/texts/InformationText';

interface TextboxProps {
  type: 'large' | 'small';
  className?: string;
  label: string;
  showInfoText?: boolean;
  infoText?: string;
  infoTextAlign?: 'left' | 'center' | 'right';
  showStar?: boolean;
  ghostText?: string;
  maxLength?: number; // 추가된 부분: 최대 글자 수
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textbox = ({
  type,
  className = '',
  label,
  showInfoText = true,
  infoTextAlign = 'left',
  showStar = true,
  ghostText = '',
  maxLength = 255, // 기본 최대 글자 수
  value = '',
  onChange = () => {}, // 추가된 부분: 기본 onChange 핸들러
}: TextboxProps): JSX.Element => {
  const getInfoText = () => {
    const length = value.length;
    return `${length}/${maxLength}`;
  };

  return (
    <div
      className={`flex-col items-start relative ${type === 'large' ? 'w-80' : ''} ${type === 'large' ? 'flex' : 'inline-flex'} ${className}`}
    >
      <div
        className={`flex flex-col items-start gap-2 relative ${type === 'large' ? 'w-full' : 'w-80'} ${type === 'large' ? 'self-stretch' : ''} ${type === 'small' ? 'flex-[0_0_auto]' : ''} ${type === 'large' ? 'h-[156px]' : ''}`}
      >
        <Lable
          prop={label}
          show={showStar}
          font='kyobo'
          className='!flex-[0_0_auto]'
        />
        <div
          className={`flex shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] relative w-full flex-col rounded-xl gap-2 bg-white self-stretch overflow-hidden ${type === 'large' ? 'items-start' : 'items-center'} ${type === 'large' ? 'flex-1' : ''} ${type === 'large' ? 'p-4' : 'px-4 py-2'} ${type === 'large' ? 'grow' : ''} ${type === 'small' ? 'h-14' : ''} ${type === 'small' ? 'justify-center' : ''}`}
        >
          <textarea
            value={value}
            onChange={onChange}
            className='w-full h-full p-2 text-base text-[#8c929d] font-bold leading-[normal] border-none outline-none resize-none'
            placeholder={ghostText}
            rows={type === 'large' ? 6 : 1}
          />
        </div>
        {showInfoText && (
          <InformationText
            state='default'
            align={infoTextAlign}
            className='mt-2'
          >
            {getInfoText()}
          </InformationText>
        )}
      </div>
    </div>
  );
};

Textbox.propTypes = {
  type: PropTypes.oneOf(['large', 'small']).isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  showInfoText: PropTypes.bool,
  infoText: PropTypes.string,
  infoTextAlign: PropTypes.oneOf(['left', 'center', 'right']),
  showStar: PropTypes.bool,
  ghostText: PropTypes.string,
  maxLength: PropTypes.number, // 추가된 부분: 최대 글자 수
  value: PropTypes.string, // 추가된 부분: inputValue
  onChange: PropTypes.func, // 추가된 부분: onChange 핸들러
};

export type { TextboxProps };
