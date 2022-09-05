import { Input, TextError } from 'components/atoms';

interface Props {
  label: string;
  onChange(_: string): void;
  value: string;
  textError?: string;
}

const InputField: React.FC<Props> = ({ label, onChange, value, textError }) => {
  return (
    <div>
      <p>{label}</p>
      <Input
        className="border py-3 mt-2"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {textError && <TextError errorMessage={textError} />}
    </div>
  );
};

export default InputField;
