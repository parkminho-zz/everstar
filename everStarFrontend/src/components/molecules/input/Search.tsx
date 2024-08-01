// Search.tsx 파일

import PropTypes from 'prop-types';
import React from 'react';
import { Placeholder } from './Placeholder';
import './Search.css';
interface SearchProps {
  state: 'done' | 'focus' | 'default';
  className: string;
}

export const Search = ({ state, className }: SearchProps): JSX.Element => {
  // buttonTextProp를 state에 따라 동적으로 설정
  const buttonTextProp =
    state === 'focus'
      ? 'l'
      : state === 'done'
        ? '검색 결과'
        : '검색어를 입력하세요';

  return (
    <div className={`w-80 flex flex-col items-start relative ${className}`}>
      <div className='w-full flex self-stretch flex-col items-start gap-2 flex-[0_0_auto] relative'>
        <div
          className={`flex items-center px-4 py-2 relative w-full flex-col rounded-xl gap-2 bg-white self-stretch h-14 overflow-hidden justify-center 
          ${state === 'focus' ? 'border-[#ff9078]' : ''} 
          ${state === 'focus' ? 'shadow-[0px_0px_24px_#ff90784c]' : 'shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99]'}
          ${state === 'focus' ? 'border-2 border-solid' : ''}`}
        >
          <Placeholder
            showLeftIcon={true} // showLeftIcon을 필요에 따라 true 또는 false 설정
            className='!self-stretch !flex-[0_0_auto] !w-full'
            state={state === 'default' ? 'default' : 'focus'}
            show
            showIcon
            color='black'
            prop={buttonTextProp}
            size='medium'
          />
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  state: PropTypes.oneOf(['done', 'focus', 'default']),
};

export type { SearchProps };
