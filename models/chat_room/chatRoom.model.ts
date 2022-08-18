import { Message } from 'models/message/message.model';

export interface ChatRoom {
  chat_room_id: number;
  image_url: string;
  description: string;
  name: string;
  type: string;
  created_at: number;
  updated_at: number;
  participants_id: number[];
  messages: Message[];
}

export interface ChatRoomFromApi {
  chat_room_id: number;
  image_url: string;
  description: string;
  name: string;
  type: string;
  created_at: number;
  updated_at: number;
  participants_id: number[];
  messages: Message[];
}
