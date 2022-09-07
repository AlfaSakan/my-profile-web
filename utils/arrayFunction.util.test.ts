import { ChatRoom } from '../models/chat_room/chatRoom.model';
import { getUserIdFromChatRoom } from './arrayFunction.util';

describe('arrayFunction test', () => {
  it('should', () => {
    const chatRooms: ChatRoom[] = [
      {
        chat_room_id: '1',
        created_at: 123,
        description: 'desc',
        image_url: '',
        messages: [],
        name: 'user',
        participants_id: ['123', '321'],
        type: '',
        updated_at: 123,
      },
      {
        chat_room_id: '1',
        created_at: 123,
        description: 'desc',
        image_url: '',
        messages: [],
        name: 'user',
        participants_id: ['12345', '54321'],
        type: '',
        updated_at: 123,
      },
    ];

    const idArr = getUserIdFromChatRoom(chatRooms);

    expect(idArr).toEqual(['123', '321', '12345', '54321']);
  });
});
