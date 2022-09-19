import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import PersonIcon from '@material-ui/icons/Person';
import { Circle } from 'components/atoms';
import { User } from 'models/user/user.model';

interface Props {
  user: User;
  isFriend?: boolean;
}

const UserCard: React.FC<Props> = ({ user, isFriend = false }) => {
  return (
    <div className="flex items-center justify-between p-3 cursor-pointer">
      <div className="flex">
        <Circle className="h-12 w-12">
          {user?.image_url ? (
            <img src={user.image_url} alt="user-profile" />
          ) : (
            <PersonIcon style={{ fill: 'white' }} />
          )}
        </Circle>
        <div className="flex flex-col">
          <p>{user.name}</p>
          <p className="text-xs mt-1">{user.status || 'Offline'}</p>
        </div>
      </div>
      <div
        className={`p-1 ${
          isFriend ? 'bg-secondary' : 'bg-red-500'
        } rounded-full`}
      >
        {isFriend ? (
          <CheckIcon style={{ fill: '#F7ECDE' }} />
        ) : (
          <AddIcon style={{ fill: '#F7ECDE' }} />
        )}
      </div>
    </div>
  );
};

export default UserCard;
