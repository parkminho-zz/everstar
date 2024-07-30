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
    containerClassName =
      'flex w-[1440px] h-[1024px] items-center justify-center gap-32 p-32 relative';
    contentClassName =
      'flex items-end justify-center gap-2.5 p-4 relative flex-1 self-stretch grow bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]';
  } else if (variant === 'tablet') {
    containerClassName = 'flex w-[821px] h-[1119px] items-center gap-16 p-16 relative';
    contentClassName =
      'flex items-end justify-center gap-2.5 p-4 relative flex-1 self-stretch grow bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]';
  } else if (variant === 'mobile') {
    containerClassName = 'inline-flex flex-col items-center justify-end gap-4 p-4 relative';
    contentClassName =
      'flex w-[328px] h-[768px] items-end justify-center gap-2.5 p-4 relative bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]';
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
