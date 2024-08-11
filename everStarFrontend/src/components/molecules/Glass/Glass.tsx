import React from 'react';
import { PageIndicator } from 'components/molecules/PageIndicator/PageIndicator';

interface GlassProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  showPageIndicator?: boolean;
  className?: string;
}

export const Glass: React.FC<GlassProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageIndicator = true,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center p-4 ${className}`}
    >
      <div className='flex items-center justify-center p-8 sm:p-12 md:p-16 w-full h-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]'>
        {showPageIndicator && (
          <PageIndicator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};
