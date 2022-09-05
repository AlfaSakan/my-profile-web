import { ChatRoom } from 'models/chat_room/chatRoom.model';

export const getUserIdFromChatRoom = (chatRooms: ChatRoom[]) => {
  if (chatRooms.length === 0) return [];

  let usersId: string[] = [];

  chatRooms.forEach((chatRoom) => {
    const ids = chatRoom.participants_id;
    ids.forEach((id) => {
      if (!usersId.includes(id)) {
        usersId.push(id);
      }
    });
  });

  return usersId;
};
