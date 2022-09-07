import { Message } from '../models/message/message.model';
import { parseStringToMessage } from './parseString.util';

describe('parseStringToMessage', () => {
  it('should parse string into message type', () => {
    const msg: Message = {
      chat_room_id: '1',
      created_at: 123,
      message: 'test',
      message_id: '11',
      sender_id: '123',
      status: 'chat',
      type: '',
    };

    const strMsg = JSON.stringify(msg);

    const message = parseStringToMessage(strMsg);

    expect(msg).toEqual(message);
  });
});
