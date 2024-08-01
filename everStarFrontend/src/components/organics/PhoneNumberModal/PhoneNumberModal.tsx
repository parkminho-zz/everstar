import React, { useState } from "react";
import { Modal } from "components/molecules/Modal/Modal";
import { InputField } from "components/organics/input/InputField";
import { PrimaryButton } from "components/atoms/buttons/PrimaryButton";
import { ArrowIcon } from "components/atoms/icons/Arrow/ArrowIcon";

interface PhoneNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify: (code: string) => void;
  text: string;
  height?: string;
}

export const PhoneNumberModal: React.FC<PhoneNumberModalProps> = ({
  isOpen,
  onClose,
  onResend,
  onVerify,
  text,
}) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleVerify = () => {
    onVerify(verificationCode);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text="핸드폰 인증하기">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <div
            className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <InputField
            label="인증번호 입력"
            showLabel={true}
            showValidationText={true}
            starshow={false}
            state="focus"
            text={verificationCode}
            showCheckIcon={true}
            className="my-10"
            placeholder="인증번호를 입력해 주세요"
            onChange={handleChange}
          />
          <div
            className="mt-10 text-blue-500 cursor-pointer text-right"
            onClick={onResend}
          >
            인증번호 재전송
          </div>
        </div>
        <div className="flex justify-end w-full mt-10">
          <PrimaryButton
            theme="white"
            size="large"
            onClick={handleVerify}
            disabled={!verificationCode}
            icon={<ArrowIcon color="black" direction="right" size={24} />}
            hug={true}
          >
            {""}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export type { PhoneNumberModalProps };
