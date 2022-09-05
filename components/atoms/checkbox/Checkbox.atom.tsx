type CheckboxType = { value: string; label: string; checked: boolean };

interface Props {
  data: CheckboxType;
  onChange?(_: boolean, _value: string): void;
}

const Checkbox: React.FC<Props> = ({ data, onChange = () => {} }) => {
  const checkboxHandler = () => {
    onChange(!data?.checked, data.value);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={checkboxHandler}
    >
      <input
        type="checkbox"
        name={data.value}
        id={data.value}
        value={data.value}
        checked={data?.checked}
        className="cursor-pointer"
        readOnly
      />
      <label className="cursor-pointer" id={data.value}>
        {data.label}
      </label>
    </div>
  );
};

export default Checkbox;
