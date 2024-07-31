import React from 'react';
import { PageIndicator } from 'components/molecules/PageIndicator/PageIndicator';

interface GlassProps {
  variant: 'desktop' | 'tablet' | 'mobile';
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  showPageIndicator?: boolean;
}

export const Glass: React.FC<GlassProps> = ({
  variant,
  currentPage,
  totalPages,
  onPageChange,
  showPageIndicator = true,
}) => {
  let containerClassName = '';
  let contentClassName = '';

  if (variant === 'desktop') {
    containerClassName = 'absolute inset-0 flex items-center justify-center';
    contentClassName =
      'flex items-end justify-center gap-2.5 p-4 flex-1 self-stretch grow bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]';
  } else if (variant === 'tablet') {
    containerClassName = 'absolute inset-0 flex items-center justify-center';
    contentClassName =
      'flex items-end justify-center gap-2.5 p-4 flex-1 self-stretch grow bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]';
  } else if (variant === 'mobile') {
    containerClassName = 'absolute inset-0 inline-flex items-center justify-center';
    contentClassName =
      'flex w-full h-auto items-end justify-center gap-2.5 pt-4 pb-4 my-4 bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]';
  }

  return (
    <div className={containerClassName}>
      <div className={contentClassName}>
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
