import SearchIcon from '@material-ui/icons/Search';
import React, { memo } from 'react';

interface IProps {
  classname?: string;
  value?: string;
  onChange?(_: string): void;
}

const Search: React.FC<IProps> = ({
  classname,
  onChange = () => {},
  value,
}) => {
  return (
    <div
      className={`flex p-2 pl-3 bg-white rounded-md items-center ${classname}`}
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

export default memo(Search);
