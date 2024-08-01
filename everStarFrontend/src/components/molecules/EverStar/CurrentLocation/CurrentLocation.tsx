import React from "react";
import { LogoIcons } from "components/atoms/symbols/Logo/LogoIcons";

export interface CurrentLocationProps {
  title: string;
}

export const CurrentLocation: React.FC<CurrentLocationProps> = ({ title }) => {
  return (
    <div className="relative flex items-center justify-center gap-8 w-72 kor-h-h2">
      <div className="w-fit mt-[-1.00px] ">{title}</div>
      <LogoIcons variant="small-star" />
    </div>
  );
};
