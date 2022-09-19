import { convertNumberToTime } from 'utils/converter.util';
import ProfilePicture from '../profile_picture/ProfilePicture.molecule';

interface IProps {
  name: string;
  dateUnix: number;
  lastMessage: string;
  imgUrl?: string;
}

const MessageCard: React.FC<IProps> = ({
  name,
  dateUnix,
  lastMessage,
  imgUrl,
}) => {
  return (
    <div className="flex items-center justify-between p-3 cursor-pointer">
      <div className="flex">
        <ProfilePicture imgUrl={imgUrl} />
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
