import { CHAT_ROOM_ROUTE } from 'constants/route.constant';
import { ChatRoom } from 'models/chat_room/chatRoom.model';
import { Response } from 'models/response/response.model';
import fetchBase from 'services/api/api.service';

interface ChatRoomParams {
  image_url?: string;
  description?: string;
  name: string;
  type?: string;
  participants_id: string[];
}

const chatRoomService = () => {
  const { mutation, query } = fetchBase();

  const getChatRoomService = async () => {
    try {
      const res = (await query(CHAT_ROOM_ROUTE, 'GET')) as Response<ChatRoom[]>;

      res.data.sort((a, b) => b.updated_at - a.updated_at);

      return res;
    } catch (error) {
      console.log('useChatRoomApi getChatRoomService Error', error);
    }
  };

  const getChatRoomByIdService = async (chatRoomId: string) => {
    try {
      const res = (await query(
        `${CHAT_ROOM_ROUTE}/${chatRoomId}`,
        'GET'
      )) as Response<ChatRoom>;

      return res;
    } catch (error) {
      console.log('useChatRoomApi getChatRoomService Error', error);
    }
  };

  const patchChatRoomService = async (
    body: ChatRoomParams,
    chatRoomId: string
  ) => {
    try {
      const res = (await mutation(
        `${CHAT_ROOM_ROUTE}/${chatRoomId}`,
        'PATCH',
        body
      )) as Response<ChatRoom>;

      return res;
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

      return res;
    } catch (error) {
      console.log('useChatRoomApi postChatRoomService error', error);
    }
  };

  return {
    getChatRoomService,
    patchChatRoomService,
    postChatRoomService,
    getChatRoomByIdService,
  };
};

export default chatRoomService;
