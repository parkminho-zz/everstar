import React from "react";
import {
  ModalHeader,
  ModalHeaderProps,
} from "components/molecules/ModalHeader/ModalHeader";

interface ModalProps extends ModalHeaderProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: string; // 선택적 height prop 추가
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  height, // height prop 추가
  ...headerProps
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-md w-[360px] max-w-full p-4"
        style={{ height: height || "auto" }} // height가 제공되면 사용, 그렇지 않으면 auto
      >
        <ModalHeader {...headerProps} onLeftIconClick={onClose} />
        <div className="justify-center">{children}</div>
      </div>
    </div>
  );
};

export type { ModalProps };
