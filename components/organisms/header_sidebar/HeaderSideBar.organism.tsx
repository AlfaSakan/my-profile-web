import ChatIcon from '@material-ui/icons/Chat';
import { Button, Text } from 'components/atoms';
import { ProfilePicture } from 'components/molecules';
import React, { memo } from 'react';

interface IProps {
  onClickMenu?(): void;
  name?: string;
  status?: string;
  imgUrl?: string;
}

const HeaderSideBar: React.FC<IProps> = ({
  onClickMenu,
  name,
  status,
  imgUrl,
}) => {
  return (
    <div className="flex items-center bg-secondary p-3 justify-between border-r border-b">
      <div className="flex items-center">
        <ProfilePicture imgUrl={imgUrl} />
        <div className="flex flex-col">
          <Text className="font-semibold">{name}</Text>
          <Text.body2 className="text-slate-500">{status}</Text.body2>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div>
          <ChatIcon style={{ fill: '#2C3333' }} />
        </div>
        <div
          className="cursor-pointer"
          onClick={onClickMenu}
          data-testid="header-side-bar-menu"
        >
          <Button text="Buat Group" isColorPrimary height={30} width={100} />
        </div>
      </div>
    </div>
  );
};

export default memo(HeaderSideBar);
