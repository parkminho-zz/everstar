import React from 'react';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';
import { SNSIcons } from 'components/atoms/symbols/SNS/SNSIcons';

interface FooterProps {
  type: 'desktop' | 'tablet' | 'mobile';
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ type, className }) => {
  const renderContent = (containerClass: string, gapClass: string) => (
    <div className={`flex items-center justify-between ${containerClass} h-[76px]`}>
      <LogoIcons variant="small-star" />
      <div className={`flex flex-col w-[374px] h-[72px] items-end justify-center ${gapClass}`}>
        <div className="flex items-center justify-end w-full gap-4">
          <div className="relative w-[86px] h-5">
            <div className="absolute top-0 left-0 opacity-70 font-bold text-[#1f2329] text-[13px] leading-normal whitespace-nowrap">
              Social media
            </div>
          </div>
          <div className="flex items-center gap-4 p-2">
            <SNSIcons variant="patron" />
            <SNSIcons variant="notion" />
            <SNSIcons variant="youtube" />
            <SNSIcons variant="instagram" />
          </div>
        </div>
        <div className="relative w-[202px] h-4">
          <p className="absolute w-[200px] top-0 left-0 opacity-70 font-bold text-[#1f2329] text-[13px] leading-normal whitespace-nowrap">
            Copyright © 2024 • SSAFY B101
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <footer className={`flex flex-col items-center justify-center w-full ${className}`}>
      <div className="flex flex-col h-20 items-center justify-center w-full border-t border-[#1f2329]">
        {type === 'desktop' && renderContent('w-[1000px]', 'gap-4')}
        {type === 'tablet' && renderContent('w-[720px]', 'gap-4')}
        {type === 'mobile' && renderContent('w-[320px]', 'gap-2')}
      </div>
    </footer>
  );
};

export type { FooterProps };
