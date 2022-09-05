import { Message } from 'models/message/message.model';

export const parseStringToMessage = (val: string) => {
  return { ...(JSON.parse(val) as Message) };
};
