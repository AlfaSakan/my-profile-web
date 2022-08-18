import { MouseEventHandler } from 'react';

interface IProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<IProps> = ({ text, onClick }) => {
  return (
    <button
      className="flex items-center justify-center w-32 h-12 rounded-lg bg-secondary"
      onClick={onClick}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
