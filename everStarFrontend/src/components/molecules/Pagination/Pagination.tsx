import React from 'react';

interface Props {
  type: 'two' | 'four' | 'three' | 'one';
  className?: string;
}

export const Pagination: React.FC<Props> = ({ type, className }): JSX.Element => {
  return (
    <div className={`inline-flex items-center gap-2 px-1 py-0 relative ${className}`}>
      <div
        className={`relative ${type === 'one' ? 'w-2.5' : 'w-1.5'} ${type === 'one' ? 'h-2.5' : 'h-1.5'} ${
          type === 'one' ? 'rounded-[5px]' : 'rounded-[3px]'
        } ${type === 'one' ? 'bg-[#ff9078]' : 'bg-[#dbe4eb]'}`}
      />
      <div
        className={`relative ${type === 'two' ? 'w-2.5' : 'w-1.5'} ${type === 'two' ? 'h-2.5' : 'h-1.5'} ${
          type === 'two' ? 'rounded-[5px]' : 'rounded-[3px]'
        } ${type === 'two' ? 'bg-[#ff9078]' : 'bg-[#dbe4eb]'}`}
      />
      <div
        className={`relative ${type === 'three' ? 'w-2.5' : 'w-1.5'} ${type === 'three' ? 'h-2.5' : 'h-1.5'} ${
          type === 'three' ? 'rounded-[5px]' : 'rounded-[3px]'
        } ${type === 'three' ? 'bg-[#ff9078]' : 'bg-[#dbe4eb]'}`}
      />
      <div
        className={`relative ${type === 'four' ? 'w-2.5' : 'w-1.5'} ${type === 'four' ? 'h-2.5' : 'h-1.5'} ${
          type === 'four' ? 'rounded-[5px]' : 'rounded-[3px]'
        } ${type === 'four' ? 'bg-[#ff9078]' : 'bg-[#dbe4eb]'}`}
      />
    </div>
  );
};

export type { Props };
