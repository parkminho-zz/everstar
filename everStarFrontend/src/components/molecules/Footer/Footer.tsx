import React from 'react';
import { LogoIcons } from 'components/atoms/symbols/Logo/LogoIcons';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={`flex flex-col items-center justify-center w-full px-4 md:px-8 lg:px-12 ${className}`}
    >
      <div className="flex flex-col items-center justify-center w-full py-6">
        <div className="flex items-center justify-center mt-4 space-x-4 text-center">
          <LogoIcons variant="vertical-star" className="w-8 h-8" />
          <div className="flex flex-col items-start justify-center text-left">
            <h5 className="text-sm"> EVERSTAR, 내 기억 속 영원한 우리의 별</h5>
            <h5 className="mt-2 text-sm">©2024 SSAFY B101. All Rights Reserved.</h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export type { FooterProps };
