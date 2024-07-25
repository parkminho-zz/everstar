import React from 'react';
import { AtomBookcover } from 'components/atoms/images/Bookcover/Bookcover';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';

interface MemorialBookCoverProps {
  className?: string;
}

export const MemorialBookCover: React.FC<MemorialBookCoverProps> = ({ className }) => {
  return (
    <div className={`flex w-[360px] h-[600px] items-center justify-center relative border border-solid border-black shadow-[0px_4px_4px_#00000040] ${className}`}>
      <AtomBookcover />
      <Avatar size="large" name="memorial" className="!absolute !left-[78px] !top-[151px]" />
    </div>
  );
};

export type { MemorialBookCoverProps };
