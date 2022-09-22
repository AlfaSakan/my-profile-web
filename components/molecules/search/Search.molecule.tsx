import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';

interface IProps {
  classname?: string;
  value?: string;
  onChange?(_: string): void;
  onClick?(): void;
  isActive?: boolean;
}

const Search: React.FC<IProps> = ({
  classname,
  onChange = () => {},
  value,
}) => {
  return (
    <div
      className={`flex p-2 pl-3 bg-white w-full rounded-md items-center ${classname}`}
    >
      <div className="mr-4">
        <SearchIcon style={{ fontSize: 20, fill: '#2C3333' }} />
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="w-full focus:outline-none bg-transparent h-full text-dark"
        placeholder="Search or start new chat"
      />
    </div>
  );
};

const Dynamic: React.FC<IProps> = ({
  classname,
  isActive = false,
  onChange = () => {},
  value,
  onClick = () => {},
}) => {
  const [active, setActive] = useState(false);

  const activeHandler = () => {
    setActive(!active);
  };

  const onClickSearch = () => {
    activeHandler();
    onClick();
  };

  useEffect(() => {
    setActive(isActive);

    return () => {
      setActive(false);
    };
  }, [isActive]);

  if (!active)
    return (
      <div onClick={activeHandler} className="cursor-pointer">
        <SearchIcon style={{ fontSize: 20, fill: '#2C3333' }} />
      </div>
    );

  return (
    <div
      className={`p-2 pl-3 bg-transparent items-center border-b ${classname}`}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="w-full focus:outline-none bg-transparent h-full text-dark"
        placeholder="Search or start new chat"
        autoFocus
      />
      <div className="cursor-pointer" onClick={onClickSearch}>
        <SearchIcon style={{ fontSize: 20, fill: '#2C3333' }} />
      </div>
    </div>
  );
};

export default Object.assign(Search, { Dynamic });
