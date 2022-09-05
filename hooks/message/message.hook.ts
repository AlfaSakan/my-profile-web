import { useState } from 'react';
import { messageService } from 'services';
import { MessageParams } from 'services/message/message.service';

const useMessageHook = () => {
  const [message, setMessage] = useState('');

  const { postMessage } = messageService();

  const messageHandler = (value: string) => {
    setMessage(value);
  };

  const onSubmitMessage =
    (sender_id: string, chat_room_id: string, type?: string) => async () => {
      try {
        const messageRequest: MessageParams = {
          message,
          chat_room_id,
          sender_id,
          type,
        };

        const res = await postMessage(messageRequest);

        setMessage('');
        return res;
      } catch (error) {
        console.log('onSubmitMessage error', error);
      }
    };

  return {
    message,
    messageHandler,
    onSubmitMessage,
  };
};

export default useMessageHook;
