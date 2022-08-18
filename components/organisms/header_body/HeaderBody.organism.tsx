import MoreVertIcon from '@material-ui/icons/MoreVert';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import { Circle } from 'components/atoms';
import React from 'react';

interface IProps {
  onClickMenu?: () => void;
  name?: string;
  status?: string;
  isFocus?: boolean;
}

const HeaderBody: React.FC<IProps> = ({
  onClickMenu,
  name,
  status,
  isFocus = false,
}) => {
  return (
    <div className="flex items-center bg-secondary p-3 justify-between h-16">
      <div className="flex items-center">
        {isFocus && (
          <Circle className="h-10 w-10">
            <PeopleIcon style={{ fill: 'white' }} />
          </Circle>
        )}
        <div className="flex flex-col">
          <p>{name}</p>
          <p className="text-xs mt-1">{status}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-5">
          <SearchIcon style={{ fill: '#2C3333' }} />
        </div>
        <div onClick={onClickMenu} className="cursor-pointer">
          <MoreVertIcon style={{ fill: '#2C3333' }} />
        </div>
      </div>
    </div>
  );
};

export default HeaderBody;
