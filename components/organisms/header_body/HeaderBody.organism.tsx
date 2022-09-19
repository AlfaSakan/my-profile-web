import PeopleIcon from '@material-ui/icons/People';
import { Button, Circle } from 'components/atoms';
import { Search } from 'components/molecules';
import React, { memo } from 'react';

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
  isFocus = true,
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
          <Search.Dynamic isActive={false} classname="w-96" />
        </div>
        <div
          onClick={onClickMenu}
          className="cursor-pointer"
          data-testid="header-body-menu"
        >
          <Button text="Keluar" isColorPrimary height={30} width={100} />
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderBody);
