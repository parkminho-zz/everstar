import React from "react";
import { LogoIcons } from "components/atoms/symbols/Logo/LogoIcons";

export interface CurrentLocationProps {
  title: string;
}

export const CurrentLocation: React.FC<CurrentLocationProps> = ({ title }) => {
  return (
    <div className="relative flex items-center justify-center gap-8 w-72">
      <div className="w-fit mt-[-1.00px] font-kor-h-h1 font-[number:var(--kor-h-h1-font-weight)] text-greyscaleblack-100 text-[length:var(--kor-h-h1-font-size)] tracking-[var(--kor-h-h1-letter-spacing)] relative leading-[var(--kor-h-h1-line-height)] [font-style:var(--kor-h-h1-font-style)]">
        {title}
      </div>
      <LogoIcons variant="small-star" />
    </div>
  );
};
