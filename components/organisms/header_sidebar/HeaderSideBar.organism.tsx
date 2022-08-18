import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import { Circle } from 'components/atoms';
import React from 'react';

interface IProps {}

const HeaderSideBar: React.FC<IProps> = () => {
  return (
    <div className="flex items-center bg-secondary p-3 justify-between border-r border-b">
      <Circle className="h-10 w-10">
        <PersonIcon style={{ fill: 'white' }} />
      </Circle>
      <div className="flex items-center gap-6">
        <div>
          <ChatIcon style={{ fill: '#2C3333' }} />
        </div>
        <div>
          <MoreVertIcon style={{ fill: '#2C3333' }} />
        </div>
      </div>
    </div>
  );
};

export default HeaderSideBar;
