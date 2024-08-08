import React from "react";
import { ModalHeader } from "components/molecules/ModalHeader/ModalHeader";
import { LetterCard } from "components/molecules/cards/LetterCard/LetterCard";
import { Textbox } from "components/molecules/input/Textbox";
import { PrimaryButton } from "components/atoms/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

export interface InputContainerProps {
  headerText: string;
  letterCardType?: "default" | "send" | "receive";
  letterCardColor?: "white" | "bgorange" | "orange" | "gray";
  letterCardState?: "received" | "notReceived";
  petName?: string;
  myName?: string;
  letterCardMessage?: string;
  myMessage?: string;
  letterCardClassName?: string;
  centered?: boolean;
  customText?: string; // 커스텀 텍스트 속성 추가
  dateTime?: string;
  textboxLabel: string;
  largeButtonText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
  isRtc?: boolean;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  headerText,
  letterCardType,
  letterCardColor = "white", // 기본값 설정
  letterCardState = "notReceived", // 기본값 설정
  letterCardMessage,
  myName,
  petName,
  myMessage,
  letterCardClassName = "font-body !kor-subtitle-subtitle3", // 여기서 폰트 변경
  centered = true,
  customText = "", // 기본값 설정
  textboxLabel,
  largeButtonText,
  smallButtonText,
  dateTime,
  showPrimaryButton = true,
  isRtc = false,
}) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    console.log("Primary Button Clicked");
  };

  const handleReplyClick = () => {
    console.log("답장하기 버튼 클릭");
  };
  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <div
        className="flex flex-col items-center w-[360px] gap-8 p-5 bg-white rounded-lg shadow-md"
        style={{ maxHeight: "742px", overflowY: "auto" }}
      >
        {/* Modal Header */}
        <ModalHeader text={headerText} showLeftIcon={true} />

        {/* Content */}
        <div className="flex flex-col items-center w-full gap-8">
          <div className="flex flex-col items-center w-full">
            {/* Letter Card or Custom Text */}
            {letterCardType ? (
              <LetterCard
                name={myName ? `${myName}에게` : undefined}
                type="send"
                color={letterCardType === "receive" ? "bgorange" : letterCardColor}
                state={letterCardState}
                message={letterCardMessage}
                className={letterCardClassName}
                centered={centered}
                dateTime={dateTime}
              />
            ) : (
              <div className="w-full">
                <div
                  className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]"
                  dangerouslySetInnerHTML={{ __html: customText }}
                />
              </div>
            )}
          </div>

          {isRtc && (
            <PrimaryButton
              theme="white"
              size="large"
              disabled={false}
              icon={null}
              onClick={() => navigate("/earth/openvidu/sessionid")}
            >
              화상통화 해보기
            </PrimaryButton>
          )}
          <div className="flex w-full">
            {letterCardType === "receive" ? (
              <div className="flex flex-col justify-center">
                <LetterCard
                  name={`${petName}에게`}
                  type="receive"
                  color="white"
                  state={letterCardState}
                  message={myMessage}
                  className={letterCardClassName}
                  dateTime={dateTime}
                  centered={centered}
                />
                <div className="mt-4">
                  <PrimaryButton
                    theme="white"
                    size="large"
                    disabled={false}
                    onClick={handleReplyClick}
                  >
                    답장하기
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center w-full">
                {/* Textbox */}
                <Textbox type="large" className="" label={textboxLabel} showStar={false} />

                {/* Large Primary Button */}
                {showPrimaryButton && (
                  <div className="flex justify-center w-full">
                    <PrimaryButton
                      theme="white"
                      size="large"
                      onClick={handleButtonClick}
                      disabled={false}
                      icon={null}
                    >
                      {largeButtonText}
                    </PrimaryButton>
                  </div>
                )}

                {/* Small Primary Button */}
                <div className="flex justify-end w-full mt-2">
                  <PrimaryButton
                    theme="white"
                    size="small"
                    onClick={handleButtonClick}
                    disabled={false}
                    icon={null}
                  >
                    {smallButtonText}
                  </PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
