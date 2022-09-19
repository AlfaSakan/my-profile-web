import { MouseEventHandler } from 'react';

interface IProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: number;
  height?: number;
  isColorPrimary?: boolean;
}

const Button: React.FC<IProps> = ({
  text,
  onClick,
  height,
  width,
  isColorPrimary = false,
}) => {
  return (
    <button
      className={`flex items-center justify-center w-32 h-12 rounded-lg ${
        isColorPrimary ? 'bg-primary' : 'bg-secondary'
      }`}
      onClick={onClick}
      style={{ height, width }}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
