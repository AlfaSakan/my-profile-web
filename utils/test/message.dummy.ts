import { Message } from 'models/message/message.model';
import { Response } from 'models/response/response.model';

export const message1: Message = {
  chat_room_id: '1',
  created_at: 123,
  message: 'test',
  message_id: '2',
  sender_id: '3',
  status: 'sent',
  type: 'chat',
};

export const message2: Message = {
  chat_room_id: '1',
  created_at: 123,
  message: 'test message',
  message_id: '2',
  sender_id: '3',
  status: 'sent',
  type: 'chat',
};

export const messages: Message[] = [message1, message2];

export const responseMessages: Response<Message[]> = {
  data: messages,
  message: 'OK',
  status: 200,
};

export const responseMessage1: Response<Message> = {
  data: message1,
  message: 'OK',
  status: 201,
};
