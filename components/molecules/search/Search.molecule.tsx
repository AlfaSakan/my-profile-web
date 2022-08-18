import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

interface IProps {}

const Search: React.FC<IProps> = () => {
  return (
    <div className="flex p-2 pl-3 bg-white rounded-md items-center">
      <div className="mr-4">
        <SearchIcon style={{ fontSize: 20, fill: '#2C3333' }} />
      </div>
      <input
        type="text"
        className="w-full focus:outline-none bg-transparent h-full text-dark"
        placeholder="Search or start new chat"
      />
    </div>
  );
};

export default Search;
