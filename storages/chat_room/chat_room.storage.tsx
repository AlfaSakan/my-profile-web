import { CHAT_ROOM_KEY } from 'constants/storage.constant';
import { ChatRoom } from 'models/chat_room/chatRoom.model';

const retrieveChatRoomsStorage = () => {
  const sChatRoom = localStorage.getItem(CHAT_ROOM_KEY);

  if (!sChatRoom) return [];

  return JSON.parse(sChatRoom) as ChatRoom[];
};

const insertChatRoomsStorage = (chatRooms: ChatRoom[]) => {
  localStorage.setItem(CHAT_ROOM_KEY, JSON.stringify(chatRooms));
};

const removeChatRoomsStorage = () => {
  localStorage.removeItem(CHAT_ROOM_KEY);
};

const chatRoomStorage = {
  retrieveChatRoomsStorage,
  insertChatRoomsStorage,
  removeChatRoomsStorage,
};

export default chatRoomStorage;
