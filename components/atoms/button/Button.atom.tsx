import { MouseEventHandler } from 'react';
import { Text } from '../';

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
      <Text.body1>{text}</Text.body1>
    </button>
  );
};

export default Button;
