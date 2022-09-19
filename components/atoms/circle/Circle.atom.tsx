import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const Circle: React.FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-full bg-gray-300 mr-4 flex items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default Circle;
