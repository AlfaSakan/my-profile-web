import { Message } from 'components/atoms';
import { COLORS_TAG } from 'constants/colors.constant';
import { Message as MessageModel } from 'models/message/message.model';
import { Participant } from 'models/participant/participant.model';
import React from 'react';

interface IProps {
  messages?: MessageModel[];
  userId: string;
  userData?: Participant[];
}

const colorUser = new Map<string, string>();

const MainBody: React.FC<IProps> = ({
  messages = [],
  userId,
  userData = [],
}) => {
  return (
    <div className="flex flex-col-reverse flex-1 sm:px-20 px-5 gap-1 pb-5 overflow-y-scroll">
      {messages.map((message, index) => {
        const userMessage = message.sender_id === userId;

        const sender = userData.find(
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
              time={message.created_at}
              isLeft={!userMessage}
              sender={sender}
              senderColor={colorUser.get(message.sender_id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MainBody;
