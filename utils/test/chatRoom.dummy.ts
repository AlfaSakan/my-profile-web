import { ChatRoom } from 'models/chat_room/chatRoom.model';
import { Response } from 'models/response/response.model';

export const chatRoom1: ChatRoom = {
  chat_room_id: '1',
  created_at: 123,
  description: 'desc',
  image_url: '',
  messages: [],
  name: 'user',
  participants_id: ['123', '321'],
  type: '',
  updated_at: 123,
};

export const chatRoom2: ChatRoom = {
  chat_room_id: '2',
  created_at: 123,
  description: 'desc',
  image_url: '',
  messages: [],
  name: 'user',
  participants_id: ['123', '321'],
  type: '',
  updated_at: 1234,
};

export const chatRoom1Updated: ChatRoom = {
  chat_room_id: '2',
  created_at: 123,
  description: 'desc',
  image_url: '',
  messages: [],
  name: 'user',
  participants_id: ['123', '321'],
  type: '',
  updated_at: 1235,
};

export const response1: Response<ChatRoom> = {
  message: 'OK',
  status: 200,
  data: chatRoom1,
};

export const response2: Response<ChatRoom[]> = {
  message: 'OK',
  status: 200,
  data: [chatRoom1, chatRoom2],
};
