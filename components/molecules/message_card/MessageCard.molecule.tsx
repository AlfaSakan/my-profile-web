import { Text } from 'components/atoms';
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
          <Text.body1>{name}</Text.body1>
          <Text.body2 className="mt-1">{lastMessage}</Text.body2>
        </div>
      </div>
      <div className="flex flex-col justify-start self-start">
        <Text.body2>{convertNumberToTime(dateUnix)}</Text.body2>
      </div>
    </div>
  );
};

export default MessageCard;
