import { useAppDispatch } from 'app/hook/hook.app';
import { MESSAGE_ROUTE } from 'constants/route.constant';
import { Message } from 'models/message/message.model';
import { Response } from 'models/response/response.model';
import useFetchBase from 'services/api/api.service';
import {
  insertMessage,
  MessageStore,
  retrieveMessages,
} from 'stores/message/message.store';

export interface MessageParams {
  chat_room_id: number;
  sender_id: number;
  type?: string;
  message: string;
}

const useMessageApi = () => {
  const { query, mutation } = useFetchBase();
  const dispatch = useAppDispatch();

  const getMessages = async (chatRoomId: number) => {
    try {
      const res = (await query(
        `${MESSAGE_ROUTE}/${chatRoomId}`,
        'GET'
      )) as Response<MessageStore[]>;

      console.log('KESINI', res);

      if (res.status === 200 && res.data !== null) {
        dispatch(retrieveMessages(res.data));
      }
    } catch (error) {
      console.log('useMessageApi getMessages', error);
    }
  };

  const postMessage = async (request: MessageParams) => {
    try {
      const res = (await mutation(MESSAGE_ROUTE, 'POST', request)) as Response<
        Message | undefined
      >;

      console.log('KESINI ==>', res);

      if (!res.data) return;

      if (res.status !== 201) return;

      dispatch(insertMessage(res.data));
    } catch (error) {
      console.log('useMessageApi postMessage', error);
    }
  };

  return {
    getMessages,
    postMessage,
  };
};

export default useMessageApi;
