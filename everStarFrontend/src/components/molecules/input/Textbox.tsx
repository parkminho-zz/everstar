import PropTypes from "prop-types";
import React from "react";
import { Lable } from "../../atoms/icons/inputfiled/Lable";
import "./Textbox.css";

interface TextboxProps {
  type: "large" | "small";
  className: any;
}

export const Textbox = ({ type, className }: TextboxProps): JSX.Element => {
  return (
    <div
      className={`flex-col items-start relative ${type === "large" ? "w-80" : ""} ${type === "large" ? "flex" : "inline-flex"} ${className}`}
    >
      <div
        className={`flex flex-col items-start gap-2 relative ${type === "large" ? "w-full" : "w-80"} ${type === "large" ? "self-stretch" : ""} ${type === "small" ? "flex-[0_0_auto]" : ""} ${type === "large" ? "h-[156px]" : ""}`}
      >
        <Lable className="!flex-[0_0_auto]" prop="레이블" show font="kyobo" />
        <div
          className={`flex shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] relative w-full flex-col rounded-xl gap-2 bg-white self-stretch overflow-hidden ${type === "large" ? "items-start" : "items-center"} ${type === "large" ? "flex-1" : ""} ${type === "large" ? "p-4" : "px-4 py-2"} ${type === "large" ? "grow" : ""} ${type === "small" ? "h-14" : ""} ${type === "small" ? "justify-center" : ""}`}
        >
          <div className="w-full flex self-stretch items-start gap-1 flex-[0_0_auto] relative">
            <div className="relative flex items-center flex-1 grow">
              <div className="[font-family:'Noto_Sans_KR-Bold',Helvetica] mt-[-1.00px] tracking-[-1.28px] text-base flex-1 text-[#8c929d] font-bold leading-[normal] relative">
                고스트 텍스트
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Textbox.propTypes = {
  type: PropTypes.oneOf(["large", "small"]),
};

export type { TextboxProps };
