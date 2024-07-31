import PropTypes from "prop-types";
import React from "react";
import { ButtonText } from "../../atoms/icons/inputfiled/ButtonText";
import { Lable } from "../../atoms/icons/inputfiled/Lable";
import "./Select.css";

interface SelectProps {
  state: "after" | "before";
  className: string;
  buttonTextIcon: JSX.Element;
}

export const Select = ({ state, className }: SelectProps): JSX.Element => {
  return (
    <div className={`w-80 flex flex-col items-start relative ${className}`}>
      <div className="w-full flex self-stretch flex-col items-start gap-2 flex-[0_0_auto] relative">
        <Lable className="!flex-[0_0_auto]" prop="레이블" show font="kyobo" />
        <div className="w-full flex self-stretch flex-col items-center gap-2 shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] px-4 py-2 h-14 overflow-hidden rounded-xl justify-center bg-white relative">
          <div className="w-full flex self-stretch items-start gap-1 flex-[0_0_auto] relative">
            <ButtonText
              className={`!flex-1 !flex ${state === "after" ? "!flex-1 ![text-align:unset] !w-[unset]" : "!text-[#8c929d] !flex-1 ![text-align:unset] !w-[unset]"}`}
              color={state === "after" ? "black" : "grey"} // 선택 전에는 회색으로 설정
              divClassName={
                state === "after"
                  ? "!flex-1 ![text-align:unset] !w-[unset]"
                  : "!text-[#8c929d] !flex-1 ![text-align:unset] !w-[unset]"
              }
              showIcon
              show
              prop={state === "after" ? "선택 후" : "선택 전"}
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Select.propTypes = {
  state: PropTypes.oneOf(["after", "before"]).isRequired,
  className: PropTypes.string.isRequired,
  buttonTextIcon: PropTypes.element.isRequired,
};

export type { SelectProps };
