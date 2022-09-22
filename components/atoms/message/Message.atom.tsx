import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { User } from 'models/user/user.model';
import React from 'react';
import { convertNumberToTime } from 'utils/converter.util';

interface IProps {
  message: string;
  time: number;
  isIcon?: boolean;
  isLeft?: boolean;
  sender?: User;
  senderColor?: string;
}

const Message: React.FC<IProps> = ({
  message,
  time,
  isIcon = true,
  isLeft = true,
  sender,
  senderColor,
}) => {
  return (
    <div className="flex-col bg-white h-fit min-w-fitCostume max-w-xs sm:max-w-xl px-2 py-1 relative rounded-md text-sm">
      {isIcon &&
        (isLeft ? (
          <div className="absolute -top-2 -left-[0.9rem]">
            <ArrowLeftIcon style={{ fill: 'white', fontSize: 30 }} />
          </div>
        ) : (
          <div className="absolute -top-2 -right-[0.9rem]">
            <ArrowRightIcon style={{ fill: 'white', fontSize: 30 }} />
          </div>
        ))}
      {sender && isLeft && (
        <p className="text-xs font-semibold" style={{ color: senderColor }}>
          {sender?.name}
        </p>
      )}
      <p>{message}</p>
      <div className="items-center gap-1 self-end">
        <p className="text-xs">{convertNumberToTime(time)}</p>
        <DoneAllIcon style={{ fontSize: 14 }} />
      </div>
    </div>
  );
};

export default Message;
