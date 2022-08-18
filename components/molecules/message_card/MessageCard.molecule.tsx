import PersonIcon from '@material-ui/icons/Person';
import { Circle } from 'components/atoms';
import { convertNumberToTime } from 'utils/converter.util';

interface IProps {
  name: string;
  dateUnix: number;
  lastMessage: string;
}

const MessageCard: React.FC<IProps> = ({ name, dateUnix, lastMessage }) => {
  return (
    <div className="flex items-center justify-between p-3 cursor-pointer">
      <div className="flex">
        <Circle className="h-12 w-12">
          <PersonIcon style={{ fill: 'white' }} />
        </Circle>
        <div className="flex flex-col">
          <p>{name}</p>
          <p className="text-xs mt-1">{lastMessage}</p>
        </div>
      </div>
      <div className="flex flex-col justify-start self-start">
        <p className="text-xs">{convertNumberToTime(dateUnix)}</p>
      </div>
    </div>
  );
};

export default MessageCard;
