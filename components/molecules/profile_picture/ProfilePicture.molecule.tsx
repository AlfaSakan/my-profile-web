import { Person } from '@material-ui/icons';
import { Circle } from 'components/atoms';
import React from 'react';

interface IProps {
  imgUrl?: string;
}

const ProfilePicture: React.FC<IProps> = ({ imgUrl }) => {
  return (
    <Circle className="h-10 w-10">
      {imgUrl ? (
        <img src={imgUrl} alt="user-profile" />
      ) : (
        <Person style={{ fill: 'white' }} />
      )}
    </Circle>
  );
};

export default ProfilePicture;
