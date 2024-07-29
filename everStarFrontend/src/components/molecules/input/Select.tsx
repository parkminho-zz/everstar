import PropTypes from "prop-types";
import React from "react";
import { ButtonText} from "../../atoms/icons/inputfiled/ButtonText";
import { Lable } from "../../atoms/icons/inputfiled/Lable";
import './Select.css'

interface SelectProps {
  state: "after" | "before";
  className: string;
  buttonTextIcon: JSX.Element;
}

export const Select = ({ state, className, buttonTextIcon = <svg
  className={`${className}`}
  fill="none"
  height="24"
  viewBox="0 0 24 24"
  width="24"
  xmlns="http://www.w3.org/2000/svg">
  <path
    clipRule="evenodd"
    d="M11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5ZM3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19 12.8487 18.3729 14.551 17.3199 15.9056L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L15.9056 17.3199C14.551 18.3729 12.8487 19 11 19C6.58172 19 3 15.4183 3 11Z"
    fill="#C3C9D3"
    fillRule="evenodd"
  />
</svg> }: SelectProps): JSX.Element => {
  return (
    <div className={`w-80 flex flex-col items-start relative ${className}`}>
      <div className="w-full flex self-stretch flex-col items-start gap-2 flex-[0_0_auto] relative">
        <Lable className="!flex-[0_0_auto]" prop="레이블" show font="kyobo" />
        <div className="w-full flex self-stretch flex-col items-center gap-2 shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] px-4 py-2 h-14 overflow-hidden rounded-xl justify-center bg-white relative">
          <div className="w-full flex self-stretch items-start gap-1 flex-[0_0_auto] relative">
            <ButtonText
              className={`!flex-1 !flex ${state === "after" ? "!flex-1 ![text-align:unset] !w-[unset]" : "!text-[#8c929d] !flex-1 ![text-align:unset] !w-[unset]"}`}
              color={state === "after" ? "black" : "grey"} // 선택 전에는 회색으로 설정
              divClassName={state === "after" ? "!flex-1 ![text-align:unset] !w-[unset]" : "!text-[#8c929d] !flex-1 ![text-align:unset] !w-[unset]"}
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
