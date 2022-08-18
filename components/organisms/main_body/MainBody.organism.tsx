import { useAppSelector } from 'app/hook/hook.app';
import { Message } from 'components/atoms';
import { COLORS_TAG } from 'constants/colors.constant';
import { Message as MessageModel } from 'models/message/message.model';
import React from 'react';

interface IProps {
  messages?: MessageModel[];
  userId: number;
}

const colorUser = new Map<number, string>();

const MainBody: React.FC<IProps> = ({ messages = [], userId }) => {
  const usersStore = useAppSelector((state) => state.participant);

  return (
    <div className="flex flex-col-reverse flex-1 px-20 gap-1 pb-5">
      {messages.map((message, index) => {
        const userMessage = message.sender_id === userId;

        const sender = usersStore.find(
          (user) => user.user_id === message.sender_id
        );

        if (!colorUser.has(message.sender_id)) {
          colorUser.set(
            message.sender_id,
            COLORS_TAG[Math.round(Math.random() * 10)]
          );
        }

        return (
          <div
            key={`message ${message.chat_room_id} ${index}`}
            className={userMessage ? 'self-end' : 'self-start'}
          >
            <Message
              message={message.message}
              time={123}
              isLeft={!userMessage}
              sender={sender}
              senderColor={colorUser.get(message.sender_id)}
            />
          </div>
        );
      })}
      {/* <Message
        message="scasc askcnalsc asckaskcnasc aksncaknsc kakcsnck scasc askcnalsc
        asckaskcnasc aksncaknsc kakcsnck"
        time={123}
      />
      <div className="self-end">
        <Message message="a" time={123} isLeft={false} />
      </div>
      <div className="self-end">
        <Message
          message="scasc askcnalsc asckaskcnasc aksncaknsc kakcsnck scasc askcnalsc
        asckaskcnasc aksncaknsc kakcsnck"
          time={123}
          isLeft={false}
        />
      </div>
      <Message message="a" time={123} />
      <Message
        message="scasc askcnalsc asckaskcnasc aksncaknsc kakcsnck scasc askcnalsc
        asckaskcnasc aksncaknsc kakcsnck"
        time={123}
      />
      <div className="self-end">
        <Message message="a" time={123} isLeft={false} />
      </div> */}
    </div>
  );
};

export default MainBody;
