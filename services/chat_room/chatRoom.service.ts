import { useAppDispatch } from 'app/hook/hook.app';
import { CHAT_ROOM_ROUTE } from 'constants/route.constant';
import { ChatRoom } from 'models/chat_room/chatRoom.model';
import { Response } from 'models/response/response.model';
import useFetchBase from 'services/api/api.service';
import {
  insertChatRoom,
  insertChatRoomsList,
  updateChatRoom,
} from 'stores/chat_room/chatRoom.store';

interface ChatRoomParams {
  image_url?: string;
  description?: string;
  name: string;
  type?: string;
}

const useChatRoomApi = () => {
  const { mutation, query } = useFetchBase();
  const dispatch = useAppDispatch();

  const getChatRoomService = async () => {
    try {
      const res = (await query(CHAT_ROOM_ROUTE, 'GET')) as Response<ChatRoom[]>;

      console.log('KESINI ===> ', res);

      if (res.status === 200 && res.data !== null) {
        dispatch(insertChatRoomsList(res.data));
      }
    } catch (error) {
      console.log('useChatRoomApi getChatRoomService', error);
    }
  };

  const patchChatRoomService = async (
    body: ChatRoomParams,
    chatRoomId: number
  ) => {
    try {
      const res = (await mutation(
        `${CHAT_ROOM_ROUTE}/${chatRoomId}`,
        'PATCH',
        body
      )) as Response<ChatRoom>;

      if (res.status === 200) {
        dispatch(updateChatRoom(body));
      }
    } catch (error) {
      console.log('useChatRoomApi patchChatRoomService', error);
    }
  };

  const postChatRoomService = async (body: ChatRoomParams) => {
    try {
      const res = (await mutation(
        CHAT_ROOM_ROUTE,
        'POST',
        body
      )) as Response<ChatRoom>;

      if (res.status === 200) {
        dispatch(insertChatRoom(res.data));
      }
    } catch (error) {
      console.log('useChatRoomApi postChatRoomService', error);
    }
  };

  return {
    getChatRoomService,
    patchChatRoomService,
    postChatRoomService,
  };
};

export default useChatRoomApi;
