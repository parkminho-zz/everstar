import PropTypes from "prop-types";
import React from "react";
import { ButtonText } from "../../atoms/icons/inputfiled/ButtonText";
import { InformationText } from "../../atoms/icons/inputfiled/InformationText";
import { Lable } from "../../atoms/icons/inputfiled/Lable";
import "./Inputfield.css";
interface InputFieldProps {
  showLabel: boolean;
  showValidationText: boolean;
  state: "default" | "focus" | "disable" | "done" | "error";
  className: string;
  buttonTextIcon: JSX.Element;
  text: string; // 하나의 text prop으로 관리
}

export const InputField = ({
  showLabel = true,
  showValidationText = true,
  state,
  className = "", // 기본값 설정
}: InputFieldProps): JSX.Element => {
  // 상태에 따른 텍스트 처리
  let validationText = "";
  if (state === "error") {
    validationText = "비밀번호가 잘못되었습니다";
  } else if (["default", "disable", "done", "focus"].includes(state)) {
    validationText = "비밀번호를 입력해 주세요";
  }

  return (
    <div
      className={`w-80 flex flex-col items-start gap-2 relative ${className}`}
    >
      {showLabel && (
        <Lable className="!flex-[0_0_auto]" prop="레이블" show font="kyobo" />
      )}
      <div
        className={`flex items-center px-4 py-2 relative w-full flex-col rounded-xl gap-2 self-stretch h-14 overflow-hidden justify-center
        ${state === "focus" ? "border-[#ff9078]" : state === "error" ? "border-[#fd2929]" : ""}
        ${["default", "done"].includes(state) ? "shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99]" : state === "focus" ? "shadow-[0px_0px_24px_#ff90784c]" : state === "error" ? "shadow-[0px_0px_24px_#fd292933]" : ""}
        ${state === "disable" ? "bg-[#f0f2f6]" : "bg-white"}
        ${["error", "focus"].includes(state) ? "border-2 border-solid" : ""}`}
      >
        <div className="w-full flex self-stretch items-start gap-1 flex-[0_0_auto] relative">
          {["default", "done", "error", "focus"].includes(state) && (
            <ButtonText
              className="!flex-1 !flex !grow"
              color="black"
              divClassName={
                state === "default"
                  ? "!text-[#8c929d] !flex-1 ![text-align:unset] !w-[unset]"
                  : "!flex-1 ![text-align:unset] !w-[unset]"
              }
              show
              showIcon
              prop={
                state === "focus"
                  ? "l"
                  : state === "done"
                    ? "완료 텍스트"
                    : state === "error"
                      ? "에러 텍스트"
                      : "고스트 텍스트"
              }
              size="large"
            />
          )}
          {state === "disable" && (
            <div className="relative flex items-center flex-1 grow">
              <div className="relative flex-1 mt-[-1.00px] [font-family:'Noto_Sans_KR-Bold',Helvetica] font-bold text-[#c3c9d3] text-base tracking-[-1.28px] leading-[normal]">
                비활성화 텍스트
              </div>
            </div>
          )}
        </div>
      </div>
      {showValidationText && (
        <InformationText
          className={state === "error" ? "!flex-[0_0_auto]" : ""}
          text={validationText} // 텍스트 prop으로 전달
          state={state === "error" ? "error" : "default"}
        />
      )}
    </div>
  );
};

InputField.propTypes = {
  showLabel: PropTypes.bool,
  showValidationText: PropTypes.bool,
  state: PropTypes.oneOf(["default", "focus", "disable", "done", "error"]),
  text: PropTypes.string.isRequired, // text는 반드시 string 타입이어야 합니다.
};

export type { InputFieldProps };
