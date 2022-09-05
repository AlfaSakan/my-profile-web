import { MESSAGE_ROUTE } from 'constants/route.constant';
import { Message } from 'models/message/message.model';
import { Response } from 'models/response/response.model';
import fetchBase from 'services/api/api.service';

export interface MessageParams {
  chat_room_id: string;
  sender_id: string;
  type?: string;
  message: string;
}

const messageService = () => {
  const { query, mutation } = fetchBase();

  const getMessages = async (chatRoomId: number) => {
    try {
      const res = (await query(
        `${MESSAGE_ROUTE}/${chatRoomId}`,
        'GET'
      )) as Response<Message[]>;

      return res;
    } catch (error) {
      console.log('useMessageApi getMessages error', error);
    }
  };

  const postMessage = async (request: MessageParams) => {
    try {
      const res = (await mutation(
        MESSAGE_ROUTE,
        'POST',
        request
      )) as Response<Message>;

      if (res.status !== 201) return;

      return res;
    } catch (error) {
      console.log('useMessageApi postMessage error', error);
    }
  };

  return {
    getMessages,
    postMessage,
  };
};

export default messageService;
