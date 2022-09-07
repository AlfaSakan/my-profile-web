interface IProps {
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const Input: React.FC<IProps> = ({ className = '', onChange, value }) => {
  return (
    <input
      type="text"
      className={`w-full focus:outline-none rounded-md py-2 px-4 ${className}`}
      placeholder="Type a message"
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
