import React from 'react';

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal: React.FC<IProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed h-full w-full bg-black-200 top-0 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Modal;
