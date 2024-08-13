import React from 'react';
import {
  ModalHeader,
  ModalHeaderProps,
} from 'components/molecules/ModalHeader/ModalHeader';

interface ModalProps extends ModalHeaderProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  height?: string;
  customStyle?: React.CSSProperties; // customStyle prop 추가
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  height,
  customStyle,
  ...headerProps
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        className='w-full max-w-md p-4 bg-white rounded-lg shadow-md '
        style={{
          height: height || '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          ...customStyle,
        }}
      >
        <ModalHeader {...headerProps} onLeftIconClick={onClose} />
        <div className='flex justify-center'>{children}</div>
      </div>
    </div>
  );
};

export type { ModalProps };
